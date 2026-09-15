(() => {
    "use strict";

    const root = document.documentElement;
    const duration = (name) =>
        parseFloat(getComputedStyle(root).getPropertyValue(name)) * 1000;

    const softMotion = matchMedia("(prefers-reduced-motion: reduce)");

    const watcher = "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries, observer) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    entry.target.classList.add("is-shown");
                    observer.unobserve(entry.target);
                }
            },
            {rootMargin: "0px 0px -12% 0px"}
        )
        : null;

    const reveal = (nodes) => {
        for (const node of nodes) {
            if (watcher) watcher.observe(node);
            else node.classList.add("is-shown");
        }
    };

    reveal(document.querySelectorAll(".reveal"));

    const data = window.MORTIZ || {};
    const catalogs = data.catalogos || {};
    const currency = data.moneda || "";

    const links = document.querySelectorAll(".art[data-catalogo]");
    const grid = document.querySelector(".pieces");
    const title = document.querySelector(".collection__title");
    const legend = document.querySelector(".collection__legend");
    const count = document.querySelector(".collection__count");
    const back = document.querySelector(".collection__back");

    const SIZES = "(min-width: 1200px) 323px, (min-width: 992px) 289px," +
        " (min-width: 768px) 209px, calc(50vw - 21px)";

    const node = (tag, className) => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        return el;
    };

    const buildPiece = (product, index) => {
        const piece = node("article", "piece");
        piece.style.setProperty("--piece-delay", `${Math.min(index, 14) * 45}ms`);

        const link = node("a", "piece__link");
        link.href = "#";

        const frame = node("div", "piece__frame");
        const canvas = node("div", "piece__canvas");
        canvas.style.aspectRatio = product.ratio;

        const img = node("img");
        img.src = `assets/img/catalogo/${product.img}-320w.webp`;
        img.srcset = `assets/img/catalogo/${product.img}-320w.webp 320w,` +
            ` assets/img/catalogo/${product.img}-640w.webp 640w`;
        img.sizes = SIZES;
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";

        const label = node("div", "piece__label");
        const name = node("h3", "piece__name");
        name.textContent = product.nombre;
        const price = node("span", "piece__price");
        price.textContent = `${currency} ${product.precio}`.trim();

        canvas.append(img);
        frame.append(canvas);
        label.append(name, price);
        link.append(frame, label);
        piece.append(link);
        return piece;
    };

    const paint = (slug) => {
        const catalog = catalogs[slug];
        if (!catalog) return false;
        title.textContent = catalog.nombre;
        legend.textContent = catalog.leyenda || "";
        count.textContent = `${catalog.productos.length} piezas`;
        grid.replaceChildren(...catalog.productos.map(buildPiece));
        return true;
    };

    for (const link of links) {
        const catalog = catalogs[link.dataset.catalogo];
        if (!catalog) continue;
        const badge = link.querySelector(".art__count");
        if (badge) badge.textContent = `${catalog.productos.length} productos`;
    }

    let current = null;
    let restoreScroll = 0;
    let busy = false;
    let pushed = false;

    const showCollection = (slug) => {
        current = slug;
        root.dataset.vista = "productos";
        scrollTo(0, 0);
        title.focus({preventScroll: true});
    };

    const showCatalog = () => {
        current = null;
        delete root.dataset.vista;
        scrollTo(0, restoreScroll);
    };

    const veilLayer = () => {
        const layer = node("div", "zoomer");
        const veil = node("div", "zoomer__veil");
        layer.append(veil);
        document.body.append(layer);
        root.dataset.transito = "";
        return {layer, veil};
    };

    const clear = (layer) => {
        layer.remove();
        delete root.dataset.transito;
        busy = false;
    };

    const settle = (veil, swap, riser) => {
        swap();
        requestAnimationFrame(() => requestAnimationFrame(() => {
            const layer = veil.parentElement;

            if (riser) {
                riser.style.transformOrigin = "50% 42vh";
                riser.animate(
                    [{transform: "scale(1.16)"}, {transform: "scale(1)"}],
                    {duration: 940, easing: "cubic-bezier(.16,.68,.28,1)"}
                ).finished.then(
                    () => {
                        riser.style.transformOrigin = "";
                    },
                    () => undefined
                );
            }

            veil.animate(
                [{opacity: 1}, {opacity: 0}],
                {
                    duration: 780,
                    easing: "cubic-bezier(.24,.62,.3,1)",
                    fill: "forwards"
                }
            ).finished.then(() => clear(layer), () => clear(layer));
        }));
    };

    const scene = document.querySelector(".gallery");

    const STEPS = 48;

    const glide = (t) => (1 - Math.cos(Math.PI * t)) / 2;

    const RAMP = 0.34;

    const surge = (t) => {
        const run = t < RAMP
            ? (t * t) / (2 * RAMP)
            : RAMP / 2 + (t - RAMP);
        return run / (1 - RAMP / 2);
    };

    const BLIND = 0.78;

    const DUSK = [
        {opacity: 0, offset: 0},
        {opacity: 0.12, offset: 0.22},
        {opacity: 0.4, offset: 0.45},
        {opacity: 0.8, offset: 0.63},
        {opacity: 1, offset: BLIND},
        {opacity: 1, offset: 1}
    ];

    const framing = (frame) => {
        const canvas = frame.querySelector(".art__canvas") || frame;
        const inner = canvas.getBoundingClientRect();
        const base = scene.getBoundingClientRect();
        const vw = innerWidth;
        const vh = innerHeight;
        const fx = inner.left + inner.width / 2;
        const fy = inner.top + inner.height / 2;
        const tx = vw / 2 - fx;
        const ty = vh / 2 - fy;
        const cover = Math.max(vw / inner.width, vh / inner.height);
        const far = cover * (softMotion.matches ? 0.74 : 0.8);

        const frames = [];
        for (let i = 0; i <= STEPS; i++) {
            const t = i / STEPS;
            const aim = glide(Math.min(t / 0.72, 1));
            const push = Math.pow(far, surge(t));
            frames.push({
                transform: `translate3d(${tx * aim}px, ${ty * aim}px, 0)` +
                    ` scale3d(${push}, ${push}, 1)`,
                offset: t
            });
        }

        return {
            origin: `${fx - base.left}px ${fy - base.top}px`,
            frames,
            deep: frames[STEPS].transform,
            photo: canvas.querySelector("img")
        };
    };

    const LIT = "brightness(0.98) contrast(1.06) saturate(0.66) sepia(0.04)";
    const DIM = "brightness(0.46) contrast(1.3) saturate(0.46) sepia(0.24)";

    const release = (shot) => {
        scene.style.transform = "";
        scene.style.transformOrigin = "";
        scene.style.willChange = "";
        scene.style.visibility = "";
        if (shot.photo) shot.photo.style.filter = "";
    };

    const lamp = (photo, from, to, ms) => {
        if (!photo) return null;
        const beam = photo.animate(
            [{filter: from}, {filter: to}],
            {duration: ms, easing: "ease-out", fill: "forwards"}
        );
        beam.finished.then(() => {
            photo.style.filter = to;
            beam.cancel();
        }, () => undefined);
        return beam;
    };

    const zoomInto = (frame, slug) => {
        const {veil} = veilLayer();
        const shot = framing(frame);
        const ms = softMotion.matches ? 1320 : 1120;

        scene.style.transformOrigin = shot.origin;
        scene.style.willChange = "transform";

        const travel = scene.animate(shot.frames, {
            duration: ms,
            easing: "linear",
            fill: "forwards"
        });

        const glow = lamp(shot.photo, DIM, LIT, ms * 0.32);

        veil.animate(DUSK, {duration: ms, easing: "linear", fill: "forwards"});

        const blind = setTimeout(() => {
            scene.style.visibility = "hidden";
        }, ms * BLIND);

        setTimeout(() => {
            clearTimeout(blind);
            travel.cancel();
            if (glow) glow.cancel();
            release(shot);
            settle(
                veil,
                () => showCollection(slug),
                document.querySelector(".view--productos")
            );
        }, ms + 70);
    };

    const zoomOutOf = (slug) => {
        const {veil} = veilLayer();
        const gentle = softMotion.matches;
        const shut = gentle ? 460 : 400;
        const ms = gentle ? 1180 : 1000;

        veil.animate(
            [{opacity: 0}, {opacity: 1}],
            {duration: shut, easing: "cubic-bezier(.4,0,.6,1)", fill: "forwards"}
        );

        const leaving = document.querySelector(".view--productos");
        leaving.style.transformOrigin = "50% 42vh";
        const sink = leaving.animate(
            [{transform: "scale(1)"}, {transform: "scale(1.16)"}],
            {duration: shut, easing: "cubic-bezier(.4,0,.75,.6)", fill: "forwards"}
        );

        setTimeout(() => {
            sink.cancel();
            leaving.style.transformOrigin = "";
            showCatalog();
            const link = document.querySelector(`.art[data-catalogo="${slug}"]`);
            const frame = link && link.querySelector(".art__frame");
            if (!frame) {
                settle(veil, () => undefined);
                return;
            }

            const shot = framing(frame);
            scene.style.transformOrigin = shot.origin;
            scene.style.transform = shot.deep;
            scene.style.willChange = "transform";
            scene.style.visibility = "hidden";

            requestAnimationFrame(() => requestAnimationFrame(() => {
                const wake = setTimeout(() => {
                    scene.style.visibility = "";
                }, ms * (1 - BLIND));

                const travel = scene.animate(shot.frames, {
                    duration: ms,
                    easing: "linear",
                    direction: "reverse",
                    fill: "forwards"
                });

                const glow = lamp(shot.photo, LIT, DIM, ms * 0.6);

                veil.animate(DUSK, {
                    duration: ms,
                    easing: "linear",
                    direction: "reverse",
                    fill: "forwards"
                });

                setTimeout(() => {
                    clearTimeout(wake);
                    travel.cancel();
                    if (glow) glow.cancel();
                    release(shot);
                    clear(veil.parentElement);
                }, ms + 60);
            }));
        }, shut + 40);
    };

    const open = (slug, frame) => {
        if (busy || !paint(slug)) return false;
        busy = true;
        restoreScroll = scrollY;
        zoomInto(frame, slug);
        return true;
    };

    const close = () => {
        if (busy || !current) return;
        busy = true;
        zoomOutOf(current);
    };

    for (const link of links) {
        link.addEventListener("click", (event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
            const slug = link.dataset.catalogo;
            const frame = link.querySelector(".art__frame");
            event.preventDefault();
            if (!open(slug, frame)) return;
            history.pushState({c: slug}, "", `?c=${slug}`);
            pushed = true;
        });
    }

    back.addEventListener("click", () => {
        if (pushed) {
            history.back();
            return;
        }
        history.replaceState({}, "", location.pathname);
        close();
    });

    addEventListener("popstate", (event) => {
        const slug = (event.state && event.state.c) || null;
        if (busy || slug === current) return;
        if (!slug) {
            pushed = false;
            close();
            return;
        }
        if (!paint(slug)) return;
        busy = true;
        pushed = true;
        const {veil} = veilLayer();
        veil.animate(
            [{opacity: 0}, {opacity: 1}],
            {duration: 300, easing: "ease-in", fill: "forwards"}
        ).finished.then(() => settle(veil, () => showCollection(slug)));
    });

    const entry = new URLSearchParams(location.search).get("c");
    if (entry && paint(entry)) {
        history.replaceState({c: entry}, "", `?c=${entry}`);
        showCollection(entry);
    }

    if (!root.classList.contains("intro")) return;

    const skip = new AbortController();
    let opened = false;

    const openIntro = () => {
        if (opened) return;
        opened = true;
        skip.abort();
        root.classList.remove("intro", "dusk");
        root.classList.add("opening");
        setTimeout(
            () => root.classList.remove("opening"),
            duration("--intro-rise")
        );
    };

    setTimeout(openIntro, Math.max(0, duration("--intro-dusk") - performance.now()));
    addEventListener("click", openIntro, {signal: skip.signal});
    addEventListener("keydown", openIntro, {signal: skip.signal});
})();
