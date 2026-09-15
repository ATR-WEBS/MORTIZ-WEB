window.MORTIZ = window.MORTIZ || {};

window.MORTIZ.moneda = "S/";

window.MORTIZ.catalogos = {
    "velas-y-candelabros": {
        nombre: "Velas y Candelabros",
        leyenda: "Luz que se consume para que la casa respire",
        productos: [
            {nombre: "Candelabro Vesper", precio: "248.00", img: 1, ratio: "2/3"},
            {nombre: "Vela Noctua", precio: "64.00", img: 3, ratio: "1/1"},
            {nombre: "Candil de Sacristia", precio: "182.00", img: 5, ratio: "4/5"},
            {nombre: "Cirio Pascual Negro", precio: "96.00", img: 2, ratio: "3/5"},
            {nombre: "Palmatoria Corvus", precio: "134.00", img: 7, ratio: "4/3"},
            {nombre: "Candelabro de Siete Brazos", precio: "398.00", img: 4, ratio: "3/4"},
            {nombre: "Vela Sangre de Martir", precio: "58.00", img: 8, ratio: "1/1"},
            {nombre: "Farol de Cripta", precio: "216.00", img: 6, ratio: "2/3"},
            {nombre: "Portavelas Ossuaire", precio: "148.00", img: 2, ratio: "4/5"},
            {nombre: "Vela Ambar Funeral", precio: "72.00", img: 1, ratio: "4/3"},
            {nombre: "Candelabro Espinas", precio: "286.00", img: 5, ratio: "3/4"},
            {nombre: "Cirio de Vigilia", precio: "88.00", img: 3, ratio: "3/5"},
            {nombre: "Apagavelas de Laton", precio: "112.00", img: 7, ratio: "1/1"},
            {nombre: "Vela Incienso Nocturno", precio: "66.00", img: 4, ratio: "4/5"},
            {nombre: "Candelabro Gargola", precio: "342.00", img: 8, ratio: "2/3"}
        ]
    },
    "espejos-y-marcos": {
        nombre: "Espejos y Marcos",
        leyenda: "Superficies que devuelven lo que no miramos",
        productos: [
            {nombre: "Espejo Ojival", precio: "428.00", img: 2, ratio: "2/3"},
            {nombre: "Marco Reliquia", precio: "156.00", img: 4, ratio: "4/5"},
            {nombre: "Espejo Bruma", precio: "312.00", img: 6, ratio: "1/1"},
            {nombre: "Marco Hiedra Negra", precio: "188.00", img: 1, ratio: "3/4"},
            {nombre: "Espejo de Mano Corvina", precio: "94.00", img: 8, ratio: "4/3"},
            {nombre: "Marco Triptico", precio: "364.00", img: 3, ratio: "3/5"},
            {nombre: "Espejo Catedral", precio: "596.00", img: 5, ratio: "2/3"},
            {nombre: "Marco Oxido", precio: "122.00", img: 7, ratio: "1/1"},
            {nombre: "Espejo Velado", precio: "268.00", img: 2, ratio: "4/5"}
        ]
    },
    "textiles-y-cortinajes": {
        nombre: "Textiles y Cortinajes",
        leyenda: "Telas que amortiguan la luz y los pasos",
        productos: [
            {nombre: "Cortinaje Vigilia", precio: "386.00", img: 3, ratio: "3/5"},
            {nombre: "Manta Terciopelo Sangre", precio: "242.00", img: 6, ratio: "4/3"},
            {nombre: "Tapiz Memento", precio: "458.00", img: 1, ratio: "3/4"},
            {nombre: "Cojin Damasco Negro", precio: "88.00", img: 8, ratio: "1/1"},
            {nombre: "Mantel de Altar", precio: "164.00", img: 4, ratio: "4/5"},
            {nombre: "Cortina Encaje Ceniza", precio: "298.00", img: 2, ratio: "2/3"},
            {nombre: "Camino de Mesa Corvus", precio: "112.00", img: 7, ratio: "4/3"},
            {nombre: "Alfombra Claustro", precio: "624.00", img: 5, ratio: "1/1"},
            {nombre: "Dosel Penumbra", precio: "512.00", img: 3, ratio: "2/3"}
        ]
    },
    "cristaleria": {
        nombre: "Cristaleria",
        leyenda: "Vidrio soplado para brindis silenciosos",
        productos: [
            {nombre: "Caliz Nocturno", precio: "138.00", img: 4, ratio: "3/5"},
            {nombre: "Copa Absenta", precio: "96.00", img: 7, ratio: "2/3"},
            {nombre: "Decantador Cripta", precio: "284.00", img: 2, ratio: "3/4"},
            {nombre: "Vaso Vitral", precio: "72.00", img: 5, ratio: "1/1"},
            {nombre: "Frasco Apotecario", precio: "64.00", img: 1, ratio: "2/3"},
            {nombre: "Jarra Obsidiana", precio: "198.00", img: 8, ratio: "4/5"},
            {nombre: "Campana de Vidrio", precio: "176.00", img: 6, ratio: "3/4"},
            {nombre: "Copa Rosetón", precio: "124.00", img: 3, ratio: "1/1"},
            {nombre: "Ampolla Lagrima", precio: "58.00", img: 4, ratio: "4/3"}
        ]
    },
    "arte-y-cuadros": {
        nombre: "Arte y Cuadros",
        leyenda: "Retratos de quienes ya no responden",
        productos: [
            {nombre: "Retrato Sin Nombre", precio: "348.00", img: 5, ratio: "3/4"},
            {nombre: "Grabado Danza Macabra", precio: "226.00", img: 2, ratio: "4/3"},
            {nombre: "Lamina Anatomica", precio: "128.00", img: 8, ratio: "2/3"},
            {nombre: "Oleo Jardin Muerto", precio: "512.00", img: 1, ratio: "4/5"},
            {nombre: "Tinta Cuervo", precio: "94.00", img: 6, ratio: "1/1"},
            {nombre: "Carta Astral Antigua", precio: "168.00", img: 3, ratio: "3/5"},
            {nombre: "Herbario Enmarcado", precio: "212.00", img: 7, ratio: "3/4"},
            {nombre: "Estudio de Manos", precio: "142.00", img: 4, ratio: "1/1"},
            {nombre: "Vanitas Pequena", precio: "276.00", img: 5, ratio: "2/3"}
        ]
    },
    "mobiliario": {
        nombre: "Mobiliario",
        leyenda: "Madera que ha sostenido a varias generaciones",
        productos: [
            {nombre: "Poltrona Confesor", precio: "1480.00", img: 6, ratio: "3/4"},
            {nombre: "Mesa de Sacristia", precio: "1260.00", img: 3, ratio: "4/3"},
            {nombre: "Banco de Nave", precio: "980.00", img: 1, ratio: "3/5"},
            {nombre: "Comoda Osario", precio: "1640.00", img: 8, ratio: "2/3"},
            {nombre: "Atril de Lectura", precio: "486.00", img: 5, ratio: "4/5"},
            {nombre: "Mesilla Gargola", precio: "624.00", img: 2, ratio: "1/1"},
            {nombre: "Vitrina Reliquiario", precio: "1920.00", img: 7, ratio: "2/3"},
            {nombre: "Taburete Claustro", precio: "342.00", img: 4, ratio: "1/1"},
            {nombre: "Biombo Penumbra", precio: "1180.00", img: 6, ratio: "3/4"}
        ]
    },
    "altares-y-rituales": {
        nombre: "Altares y Rituales",
        leyenda: "Lo necesario para sostener una intencion",
        productos: [
            {nombre: "Altar Portatil", precio: "428.00", img: 7, ratio: "4/5"},
            {nombre: "Incensario Colgante", precio: "186.00", img: 1, ratio: "2/3"},
            {nombre: "Caldero de Hierro", precio: "248.00", img: 4, ratio: "1/1"},
            {nombre: "Campana de Vigilia", precio: "134.00", img: 6, ratio: "3/5"},
            {nombre: "Mortero de Piedra", precio: "158.00", img: 2, ratio: "4/3"},
            {nombre: "Athame Ceremonial", precio: "212.00", img: 8, ratio: "3/4"},
            {nombre: "Pentaculo de Laton", precio: "176.00", img: 3, ratio: "1/1"},
            {nombre: "Reliquiario Vacio", precio: "394.00", img: 5, ratio: "2/3"},
            {nombre: "Bandeja de Ofrenda", precio: "122.00", img: 7, ratio: "4/5"}
        ]
    },
    "jardin-nocturno": {
        nombre: "Jardin Nocturno",
        leyenda: "Lo que florece cuando nadie mira",
        productos: [
            {nombre: "Macetero Gargola", precio: "268.00", img: 8, ratio: "3/4"},
            {nombre: "Rosa Negra Preservada", precio: "88.00", img: 5, ratio: "1/1"},
            {nombre: "Farol de Sendero", precio: "196.00", img: 2, ratio: "2/3"},
            {nombre: "Fuente Pequena", precio: "742.00", img: 7, ratio: "4/5"},
            {nombre: "Terrario Cripta", precio: "324.00", img: 1, ratio: "3/5"},
            {nombre: "Estatua Doliente", precio: "886.00", img: 4, ratio: "2/3"},
            {nombre: "Campanas de Viento", precio: "112.00", img: 6, ratio: "4/3"},
            {nombre: "Reloj de Sol Lunar", precio: "458.00", img: 3, ratio: "1/1"},
            {nombre: "Hiedra Inmortal", precio: "76.00", img: 8, ratio: "3/4"}
        ]
    }
};
