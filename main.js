var centroNatal = [-5.815, -35.2]; // Definindo ponto central do mapa

var limites = L.latLngBounds(
  // Definição dos limites para o mapa
  L.latLng(-5.96, -35.5), // Canto sudoeste de Natal
  L.latLng(-5.66, -34.9) // Canto nordeste de Natal
);

var mapa = L.map(document.getElementById("map"), {
  // Criando o mapa L.map e colocando o nome da variável de "mapa"
  center: centroNatal, // Definindo o ponto central como o criado anteriormente
  zoom: 12, // Zoom inicial
  zoomControl: false, // Tirar o controle de zoom para acrescentar outro
  maxBounds: limites,
  maxBoundsViscosity: 1,
  attributionControl: false,
  measureControl: true
});

L.control
  .attribution({
    position: "bottomleft",
  })
  .addTo(mapa);

L.control
  .zoom({
    // Colocando o controle de zoom
    position: "topleft", // Posição no lado esquerdo no topo
    zoomInText: "+", // Texto que irá aparecer para dar zoom
    zoomInTitle: "Aumentar zoom", // Texto que irá aparecer quando repousar o mouse por cima de dar zoom
    zoomOutText: "-", // Texto que irá aparecer para tirar o zoom
    zoomOutTitle: "Diminuir zoom", // Texto que irá aparecer quando repousar o mouse por cima do tirar o zoom
  })
  .addTo(mapa); // Adicionando ao mapa

L.control
  .scale({
    // Adicionando o controle de escala
    position: "bottomleft", // Local onde ficará - Baixo esquerda
    metric: true, // Adotando a unidade métrica
    maxWidth: 200, // Máximo de tamanho que ela irá adotar
  })
  .addTo(mapa); // Adicionando ao mapa

var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  // Adicionando o layer do OSM
  minZoom: 11,
  attribution: "© OpenStreetMap", // Atribuição do osm
}).addTo(mapa); // Adicionando diretamente ao mapa, para iniciar com este layer

var Esri_WorldImagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    minZoom: 11, // Adicionando mais um layer, agora de imagem de satélite
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community", // Atribuição necessária
  }
); // Não adicionei ao mapa, pois já tem o osm

var baselayers = {
  // Criando uma variável para armazenar estes layers
  "Open Street Map": osm,
  "Imagem de satélite": Esri_WorldImagery,
};

L.control.layers(baselayers).addTo(mapa); // Colocando a variável no controle de camadas para o usuário escolher o que quiser

var minimap = new L.TileLayer(
  "https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=vWFBj8qOFh6HyyqNKMi8", // Variável de layer para o minimap
  {
    minZoom: 0, // Zoom mínimo
    maxZoom: 13, // Zoom máximo
  }
);

var miniMap = new L.Control.MiniMap(minimap, {
  // Adicionar o minimapa com o tile colocado na variável
  position: "bottomleft", // Posição
  toggleDisplay: true, // Ter a possibilidade de minimizar
  minimized: true, // Começar minimizado
  shadowRectOptions: true, //
  condensedAttributionControl: false, // Tirar o atributo
}).addTo(mapa);

var print = L.control
  .browserPrint({
    // Adicionando possibilidade de impressão
    title: "Imprimir", // Título quando colocar o mouse em cima
    printModes: [
      // Modos de impressão
      "Retrato", // Retrato
      "Paisagem",
    ], // Paisagem
    documentTitle:
      "Mapa gerado pelo site da Secretaria de Meio Ambiente e Urbanismo de Natal", // Título que irá aparecer no documento
    closePopupsOnPrint: true, // Fechar os popups quando for imprimir
  })
  .addTo(mapa); // Adicionando ao mapa

L.control
  .polylineMeasure({
    // Régua
    position: "topleft", // Posição
    unit: "kilometres", // Unidades
    clearMeasurementsOnStop: false, // Para limpar a medição quando parar de usar a configuração
    tooltipTextFinish: "Clique para finalizar<br>", // Texto que aparecerá quando quiser finalizar
    tooltipTextDelete:
      "<br>Aperte <b>SHIFT e clique</b> para excluir o ponto<br>", // Texto que aparecerá quando puder deletar um ponto
    tooltipTextMove: "<br>Clique e arraste o ponto para um outro local<br>", // Texto que aparece quando puder movimentar o ponto
    tooltipTextResume:
      "<br>Aperte <b> CTRL e clique</b> para continuar deste ponto<br>", // Texto que aparecequando pode continuar a criar pontos
    tooltipTextAdd:
      "<br> Aperte <b> CTRL e clique</b> para adicionar um ponto<br>", // Texto para adicionar ponto
    measureControlTitleOn: "Ativar régua", // O que aparece quando repousa o mouse no botão da régua
    measureControlTitleOff: "Desativar régua", // O que aparece quando repousa o mouse no botão de fechar a régua
    measureControlLabel: "&#128207", // Ícone da régua
    showClearControl: true, // Mostrar o limpar régua
    measureControlClasses: [],
    clearControlTitle: "Limpar todas medições", // Texto que aparecerá quando repousar mouse sobre o limpar medição
    clearControlLabel: "&times", // Ícone de limpar
    clearControlClasses: [],
    fixedLine: {
      // Configurações da linha de medição
      color: "#000", // Cor da linha
      weight: 2, // Espessura da linha
    },
    arrow: {
      // Configuração da flecha
      color: "#00f", // Cor da flecha
    },
  })
  .addTo(mapa); // Adicionando ao mapa

L.Control.arearuler({
  unity: 'm',
  shapeOptions: {
    color: '#00f',
    stroke: true,
    weight: 2,
    opacity: 0.5,
    fill: true
  }
})
  .addTo(mapa);

$(document).ready(function () {
  // Configuração do menu dropdown e do menu lateral

  $(".sub-btn").click(function () {
    // Quando clicar no botão de classe sub-btn
    $(this).next(".sub-menu").slideToggle(); // Abre o sub-menu
    $(this).find(".dropdown").toggleClass("rotate"); // Rotaciona o ícone
  });

  $(".cont-but").click(function () {
    // Quando clicar no botão de classe cont-but
    $(".side-bar").addClass("active"); // Ativa o sidebar
    $(".menu-btn").css("visibility", "hidden");
  });

  $(".close-btn").click(function () {
    // Quando clica no botão de fechar
    $(".side-bar").removeClass("active"); // fecha o sidebar
    $(".menu-btn").css("visibility", "visible");
  });
});

function openNav() {
  // Função para abrir o menu de download e definição da sua largura
  document.getElementById("mySidebar").style.width = "35%";
}

function closeNav() {
  // Função para fechar o menu de download e definição da sua largura, que retornará a zero após o uso
  document.getElementById("mySidebar").style.width = "0";
}

var coordDIV = document.createElement("div"); // Adicionando informações de qual coordenada que o mouse está passando no mapa
coordDIV.id = "mapCoordDIV";
coordDIV.style.position = "absolute";
coordDIV.style.bottom = "10px";
coordDIV.style.left = "50%";
coordDIV.style.transform = "translateX(-50%)";
coordDIV.style.zIndex = "900";
coordDIV.style.color = "#fff";
coordDIV.style.fontFamily = "Arial, sans-serif";
coordDIV.style.fontSize = "14px";
coordDIV.style.padding = "8px 12px";
coordDIV.style.borderRadius = "8px";
coordDIV.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
coordDIV.style.textShadow = "1px 1px 2px #000";
document.getElementById("map").appendChild(coordDIV);

mapa.on("mousemove", function (e) {
  var lat = e.latlng.lat.toFixed(4);
  var lon = e.latlng.lng.toFixed(4);
  document.getElementById("mapCoordDIV").innerHTML =
    "Coordenadas: " + lat + " , " + lon;
});

function criarcamada(mapa, urlsOuCaminhos, cor, checkboxId) {
  var camadasGeoJSON = [];

  function adicionarPopup(feicao, layer) {
    if (feicao.properties) {
      var popupContent = "<table class='tabela-popup'>";
      for (var propriedade in feicao.properties) {
        if (feicao.properties.hasOwnProperty(propriedade)) {
          popupContent += "<tr><td><strong>" + propriedade + "</strong></td><td>" + feicao.properties[propriedade] + "</td></tr>";
        }
      }
      popupContent += "</table>";
      layer.bindPopup(popupContent);

      // Adicionar eventos mouseover e mouseout para alterar o estilo da feição temporariamente
      layer.on('mouseover', function (e) {
        if (!layer.isPopupOpen()) {
          // Altera o estilo do contorno
          this.setStyle({
            color: 'red',       // Cor do contorno
            weight: 3           // Espessura da linha do contorno
          });

          // Altera o estilo do preenchimento
          if (feicao.geometry.type === 'Point') {
            // Se for um ponto, aumenta o raio do círculo
            this.setStyle({
              fillColor: 'red', // Cor do preenchimento
              radius: 8         // Raio do círculo
            });
          } else {
            // Se for outra feição (por exemplo, polígono), aumenta a opacidade do preenchimento
            this.setStyle({
              fillColor: 'red',     // Cor do preenchimento
              fillOpacity: 0.7      // Opacidade do preenchimento
            });
          }
        }
      });

      layer.on('mouseout', function (e) {
        if (!layer.isPopupOpen()) {
          // Restaura o estilo do contorno
          this.setStyle({
            color: '#000',      // Cor do contorno de volta ao preto
            weight: 2           // Espessura da linha do contorno de volta ao padrão
          });

          // Restaura o estilo do preenchimento
          if (feicao.geometry.type === 'Point') {
            // Se for um ponto, restaura o raio do círculo
            this.setStyle({
              fillColor: cor,     // Cor do preenchimento de volta ao padrão
              radius: 5           // Raio do círculo de volta ao padrão
            });
          } else {
            // Se for outra feição (por exemplo, polígono), restaura a opacidade do preenchimento
            this.setStyle({
              fillColor: cor,         // Cor do preenchimento de volta ao padrão
              fillOpacity: 0.5        // Opacidade do preenchimento de volta ao padrão
            });
          }
        }
      });

      // Adicionar evento para destacar a feição enquanto o popup estiver aberto
      layer.on('popupopen', function (e) {
        // Altera o estilo do contorno
        this.setStyle({
          color: 'red',       // Cor do contorno
          weight: 3           // Espessura da linha do contorno
        });

        // Altera o estilo do preenchimento
        if (feicao.geometry.type === 'Point') {
          // Se for um ponto, aumenta o raio do círculo
          this.setStyle({
            fillColor: 'red', // Cor do preenchimento
            radius: 8         // Raio do círculo
          });
        } else {
          // Se for outra feição (por exemplo, polígono), aumenta a opacidade do preenchimento
          this.setStyle({
            fillColor: 'red',     // Cor do preenchimento
            fillOpacity: 0.7      // Opacidade do preenchimento
          });
        }
      });

      // Adicionar evento para restaurar o estilo da feição quando o popup for fechado
      layer.on('popupclose', function (e) {
        // Restaura o estilo do contorno
        this.setStyle({
          color: '#000',      // Cor do contorno de volta ao preto
          weight: 2           // Espessura da linha do contorno de volta ao padrão
        });

        // Restaura o estilo do preenchimento
        if (feicao.geometry.type === 'Point') {
          // Se for um ponto, restaura o raio do círculo
          this.setStyle({
            fillColor: cor,     // Cor do preenchimento de volta ao padrão
            radius: 5           // Raio do círculo de volta ao padrão
          });
        } else {
          // Se for outra feição (por exemplo, polígono), restaura a opacidade do preenchimento
          this.setStyle({
            fillColor: cor,         // Cor do preenchimento de volta ao padrão
            fillOpacity: 0.5        // Opacidade do preenchimento de volta ao padrão
          });
        }
      });
    }
  }

  function adicionarCamada(camada) {
    var markers = L.markerClusterGroup(); // Cria um grupo de marcadores

    camada.eachLayer(function (layer) {
      markers.addLayer(layer); // Adiciona cada camada ao grupo de marcadores
    });

    mapa.addLayer(markers); // Adiciona o grupo de marcadores ao mapa
  }

  // Função para estilizar a feição
  function estiloFeicao(feicao) {
    if (feicao.geometry.type === 'Point') {
      // Se a feição for um ponto, retorna um objeto para estilizar o círculo
      return {
        fillColor: cor, // Cor de preenchimento
        color: "#000",  // Cor da borda
        weight: 0.5,      // Espessura da linha/borda
        opacity: 0.7,     // Opacidade
        fillOpacity: 1, // Opacidade do preenchimento
        radius: 5 // Raio do círculo
      };
    } else {
      // Caso contrário, retorna um estilo padrão para outras feições
      return {
        fillColor: cor, // Cor de preenchimento
        color: "#000",  // Cor da borda
        weight: 2,      // Espessura da linha/borda
        opacity: 1,     // Opacidade
        fillOpacity: 0.5 // Opacidade do preenchimento
      };
    }
  }

  // Função para carregar e adicionar a camada ao mapa
  function adicionarCamada(camada) {
    camada.addTo(mapa);
  }

  // Verifica se o checkbox está marcado
  function checkboxMarcado() {
    return document.getElementById(checkboxId).checked;
  }

  // Adiciona um listener para o evento "change" do checkbox
  document.getElementById(checkboxId).addEventListener('change', function () {
    // Se o checkbox estiver marcado, adiciona as camadas ao mapa
    if (checkboxMarcado()) {
      urlsOuCaminhos.forEach(function (urlOuCaminho) {
        // Verifica se a URL começa com "http" para determinar se é uma URL ou um caminho local
        if (urlOuCaminho.startsWith("http")) {
          // Se a URL começar com "http", carregue o GeoJSON do CDN
          fetch(urlOuCaminho)
            .then(response => response.json())
            .then(data => {
              var camadaGeoJSON = L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                  // Cria um círculo para cada ponto
                  return L.circleMarker(latlng);
                },
                style: estiloFeicao,
                onEachFeature: adicionarPopup
              });
              camadasGeoJSON.push(camadaGeoJSON);
              adicionarCamada(camadaGeoJSON);
            })
            .catch(error => {
              console.error('Erro ao carregar dados GeoJSON do CDN:', error);
            });
        } else {
          // Caso contrário, é um caminho local, carregue o GeoJSON do arquivo local
          fetch(urlOuCaminho)
            .then(response => response.json())
            .then(data => {
              var camadaGeoJSON = L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                  // Cria um círculo para cada ponto
                  return L.circleMarker(latlng);
                },
                style: estiloFeicao,
                onEachFeature: adicionarPopup
              });
              camadasGeoJSON.push(camadaGeoJSON);
              adicionarCamada(camadaGeoJSON);
            })
            .catch(error => {
              console.error('Erro ao carregar dados GeoJSON do arquivo local:', error);
            });
        }
      });
    } else {
      // Se o checkbox não estiver marcado, remove as camadas do mapa
      camadasGeoJSON.forEach(function (camadaGeoJSON) {
        mapa.removeLayer(camadaGeoJSON);
      });
      camadasGeoJSON = [];
    }
  });

}

var geojsonLayers = [];
var geojsonURLs = [
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/quadras/zonaleste.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/quadras/zonanorte.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/quadras/zonaoeste.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/quadras/zonasul.geojson'
];

geojsonURLs.forEach(function (url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      var layer = L.geoJSON(data, {
        opacity: 0,
        interactive: false
      });
      geojsonLayers.push(layer);
    });
});

function search() {
  var searchTerm = document.getElementById('searchInput').value.trim(); // Remove espaços em branco extras
  var numericRegex = /^[0-9]+$/; // Expressão regular para verificar se há apenas números

  if (numericRegex.test(searchTerm) && geojsonLayers.length > 0) { // Verifica se o valor é um número e se há camadas GeoJSON
    var searchTermAsNumber = parseInt(searchTerm); // Converte o valor para número inteiro
    var found = false; // Variável para verificar se a quadra foi encontrada

    geojsonLayers.forEach(function (layer) {
      layer.eachLayer(function (l) {
        if (l.feature.properties.QUADRA === searchTermAsNumber) {
          mapa.setView(l.getBounds().getCenter(), 22); // Define a visão para o centro da quadra
          var marker = L.marker(l.getBounds().getCenter()).addTo(mapa); // Adiciona um marcador no centro da quadra
          // Adiciona informações do GeoJSON ao popup do marcador
          marker.bindPopup("<h3 style='color: black;'><b><span style='color:black;'>Quadra:</span></b> " + l.feature.properties.QUADRA +
            "<br><b><span style='color:black;'>Bairro:</span></b> " + l.feature.properties.BAIRRO +"</h3>").openPopup();


          found = true; // Marca que a quadra foi encontrada
        }
      });
    });

    if (!found) {
      alert("Quadra não encontrada.");
    }
  } else {
    alert("Por favor, insira apenas números válidos.");
  }
}


function closeSearch() {
  document.getElementById('searchInput').value = '';

  // Redefinir as configurações do mapa para o estado normal
  mapa.setView(centroNatal, 12);
  mapa.zoomControl = false;
  mapa.maxBounds = limites;
  mapa.maxBoundsViscosity = 1;
  mapa.attributionControl = false;
  mapa.measureControl = true;

  // Remover todos os marcadores do mapa
  mapa.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      mapa.removeLayer(layer);
    }
  });
}

criarcamada(mapa, [
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/lotes/zs1.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/lotes/zs2.geojson'],
  'black', 'lot_zs')

criarcamada(mapa, [
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/lotes/zo1.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/lotes/zo2.geojson'],
  'black', 'lot_zo')

criarcamada(mapa, [
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/lotes/zl_var.geojson'],
  'black', 'lot_zl')

criarcamada(mapa, [
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/lotes/zn1.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/lotes/zn2.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/lotes/zn3.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/lotes/zn4.geojson'],
  'black', 'lot_zn')

// 1. Limites Físicos:
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/1_limites_fisicos/lim_zadm.geojson'], 'black', 'lf_zadm')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/1_limites_fisicos/limite_bairros.geojson'], 'black', 'lf_lim_bai')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/1_limites_fisicos/per_natal.geojson'], 'black', 'lf_per')

// 2. Localização
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/2_localizacao/lograd.geojson'], 'black', 'loc_logra');

// 3. Setores Censitários
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/3_set_censi/set_cens.geojson'], 'black', 'sc_censo')

// 4. Curvas de nível
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/4_curvas/sz1.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/4_curvas/sz2.geojson'],
  'black', 'curvas_sz')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/4_curvas/zn1.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/4_curvas/zn2.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/4_curvas/zn3.geojson'],
  'black', 'curvas_zn')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/4_curvas/zs1.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/4_curvas/zs2.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/4_curvas/zs3.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/4_curvas/zs4.geojson'],
  'black', 'curvas_zs')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/4_curvas/zl1.geojson'],
  'black', 'curvas_zl')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/4_curvas/zo1.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/4_curvas/zo2.geojson'],
  'black', 'curvas_zo')

// 5. Cadastro Físico
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/quadras/zonaleste.geojson'], 'black', 'qua_zl')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/quadras/zonanorte.geojson'], 'black', 'qua_zn')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/quadras/zonasul.geojson'], 'black', 'qua_zs')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/cadfis/quadras/zonaoeste.geojson'], 'black', 'qua_zo')

// 6. Parcelamento do Solo Urbano
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/6_parc_solo/conj_1.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/6_parc_solo/conj_2.geojson'
], 'black', 'pu_conj')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/6_parc_solo/lot_2.geojson',
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/6_parc_solo/lot_1.geojson'
], 'black', 'pu_loteamento')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/6_parc_solo/circ_imob.geojson'], 'black', 'pu_circimo')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/6_parc_solo/reg_fund_1.geojson', 
  'https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/6_parc_solo/reg_fund_2.geojson'
], 'black', 'pu_regfund')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/6_parc_solo/regimejuridico/area_for_natal.geojson'], 'black', 'rj_afm')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/6_parc_solo/regimejuridico/area_for_uniao.geojson'], 'black', 'rj_afu')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/6_parc_solo/regimejuridico/area_ind.geojson'], 'black', 'rj_ind')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/6_parc_solo/regimejuridico/area_prop.geojson'], 'black', 'rj_area_prop')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/6_parc_solo/regimejuridico/lpm.geojson'], 'black', 'rj_lpm')

// 7. Equipamentos comunitários
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/7_equip_com/equi_desp.geojson'], 'black', 'ec_eqesp')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/7_equip_com/seg_pub.geojson'], 'black', 'ec_segpub')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/7_equip_com/uni_sau.geojson'], 'black', 'ec_unidsau')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/7_equip_com/escola/escola_privada.geojson'], 'black', 'ec_esc_priv')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/7_equip_com/escola/escola_pub.geojson'], 'black', 'ec_esc_pub')

// 8. Infraestrutura
// 8.1 Mobilidade
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_1_mobilidade/ferrea_cm.geojson'], 'black', 'mob_fer_cm')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_1_mobilidade/ferrea_parna.geojson'], 'black', 'mob_fer_par')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_1_mobilidade/linha_ferrea.geojson'], 'black', 'mob_fer')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_1_mobilidade/par_onibus.geojson'], 'black', 'infra_po')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_1_mobilidade/cbtugeo.geojson'], 'black', 'infra_est_fer')


// 8.2 Energia
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_2_energia/substa%C3%A7%C3%B5es.geojson'], 'black', 'ener_subest')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/postes/semzona.geojson'], 'black', 'postes_sz')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/postes/zl.geojson'], 'black', 'postes_zl')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/postes/zs.geojson'], 'black', 'postes_zs')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/postes/zn.geojson'], 'black', 'postes_zn')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/postes/zo.geojson'], 'black', 'postes_zo')
// 8.3 Água
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_3_agua/est_elev_agua.geojson'], 'black', 'a_eea')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_3_agua/eta.geojson'], 'black', 'a_eta')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_3_agua/pocos_2.geojson'], 'black', 'a_poco')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_3_agua/reserv.geojson'], 'black', 'a_reserv')
// 8.4 Esgoto
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_4_esgoto/est_elev_esgoto.geojson'], 'black', 'esg_eee')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_4_esgoto/est_trat_esgoto.geojson'], 'black', 'esg_ete')
// 8.5 Drenagem
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_5_drenagem/bacia_drenagem.geojson'], 'black', 'dren_bd')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_5_drenagem/lagoa_drenagem.geojson'], 'black', 'dren_ld')
// 8.6 Gas
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/8_infraestrutura/gasoduto.geojson'], 'black', 'gas_tub')
// 8.7 Comunicação
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/8_infraestrutura/8_7_comunicacao/embratel.geojson'], 'black', 'com_emb')

// 9.0 Serviços
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/9_servicos/cemit.geojson'], 'black', 'serv_cem')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/9_servicos/feira_livre.geojson'], 'black', 'serv_fei')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/9_servicos/mercado_publico.geojson'], 'black', 'serv_mercpub')

// 10 Mobiliário Urbano
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/10_mob_urbano/mapas_end.geojson'], 'black', 'mob_plac')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/10_mob_urbano/mupi.geojson'], 'black', 'mob_mupis')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/10_mob_urbano/relogio.geojson'], 'black', 'mob_relogios')

// 11 Área de influência de voo
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/11_area_infl_voo/aeroporto.geojson'], 'black', 'area_aero')

// 13 Plano Diretor de Natal
// Mapas Gerais
// Mapa 001
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/mapasgerais/Mapa_001/macrozoneamento.geojson'], 'black', 'pdn22_macro')
// Mapa 002
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/mapasgerais/Mapa_002/ca_bacia.geojson'], 'black', 'pdn22_CAbacia')
// Mapa 002A
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/mapasgerais/Mapa_002A/ca_bairro.geojson'], 'black', 'pdn22_bai_max')

// Mapa_004A
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/mapasgerais/Mapa_004A/mis.geojson'], 'black', 'pdn22_mis')
// Mapa_005
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/mapasgerais/Mapa_005/aou.geojson'], 'black', 'pdn22_aou')
// Mapa_020
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/mapasgerais/Mapa_020/esp_amea.geojson'], 'black', 'pdn22_ameac')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/mapasgerais/Mapa_020/pesca.geojson'], 'black', 'pdn22_pesca')
// Mapa_024
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/mapasgerais/Mapa_024/eixos_est.geojson'], 'black', 'pdn22_ee_ee')

// Patrimônio de bens tombados
// Estadual
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/bens_tombados/est/pat_est_pol.geojson'], 'black', 'pdn22_est_pol')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/bens_tombados/est/pat_est.geojson'], 'black', 'pdn22_est_pont')
// federal, estadual e ferroviário
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/bens_tombados/fed_est_fer/fed_est_fer_pol.geojson'], 'black', 'pdn22_fed_est_fer_pol')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/bens_tombados/fed_est_fer/fed_est_fer.geojson'], 'black', 'pdn22_fed_est_fer')
// Federal Municipal e Ferroviário
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/bens_tombados/fed_mun_fer/fed_mun_fer_pol.geojson'], 'black', 'pdn22_fed_mun_fer_pol')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/bens_tombados/fed_mun_fer/fed_mun_fer.geojson'], 'black', 'pdn22_fed_mun_fer')
// Municipal
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/bens_tombados/mun/pat_mun.geojson'], 'black', 'pdn22_mun')

// Áreas Especiais
// Mapa_004
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/Mapa_004/cata.geojson'], 'black', 'pdn22_cata')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/Mapa_004/catb.geojson'], 'black', 'pdn22_catb')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/Mapa_004/catc.geojson'], 'black', 'pdn22_catc')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/Mapa_004/cat_d.geojson'], 'black', 'pdn22_catd')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/Mapa_004/conc_vilas.geojson'], 'black', 'pdn22_cat_conc')
// Mapa_006
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/Mapa_006/aepc.geojson'], 'black', 'pdn22_aepc')
// Mapa_007
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/Mapa_007/aeitp.geojson'], 'black', 'pdn22_aeitp')
// Mapa_019
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/Mapa_019/limmar.geojson'], 'black', 'pdn22_limmar')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/Mapa_019/orlaflu.geojson'], 'black', 'pdn22_orlafluv')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/Mapa_019/orlamar.geojson'], 'black', 'pdn22_marit')
// Mapa_025
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/Mapa_025/aeru.geojson'], 'black', 'pdn22_aeru')
// Mapa_026
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/Mapa_026/aem.geojson'], 'black', 'pdn22_aem')
// Mapa_027
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/Mapa_027/aep.geojson'], 'black', 'pdn22_aep')
// Mapa_012
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/poten_risco/Mapa_012/risco_nat.geojson'], 'black', 'pdn22_riscnat_agua')
// Mapa_013
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/poten_risco/Mapa_013/tec_ag_solo_pol.geojson'], 'black', 'pdn22_risctecn_aguasol_pol')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/poten_risco/Mapa_013/tec_ag_solo.geojson'], 'black', 'pdn22_risctecn_aguasol')
// Mapa_014
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/poten_risco/Mapa_014/aepr.geojson'], 'black', 'pdn22_aepr')
// Mapa_015
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/poten_risco/Mapa_015/ero_cost.geojson'], 'black', 'pdn22_cost_er')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/poten_risco/Mapa_015/praiasprio.geojson'], 'black', 'pdn22_cost_pp')
// Mapa_016
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/poten_risco/Mapa_016/rodovias.geojson'], 'black', 'pdn22_mod_rod')
// Mapa_017
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/13_pdn/areas_esp/poten_risco/Mapa_017/altatensao.geojson'], 'black', 'pdn22_ris_tec_at')

// 14 - Transferência de Potencial Construtivo (TPC)
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/14_tpc/ced.geojson'], 'black', 'tpc_ced')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/14_tpc/recept.geojson'], 'black', 'tpc_rec')

// 15 Licenciamento
// Alvarás
// 2017
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2017/amp2017.geojson'], '#939', 'amp17')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2017/const2017.geojson'], '#f00', 'const17')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2017/dem2017.geojson'], '#ff0', 'dem17')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2017/leg2017.geojson'], '#000', 'leg17')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2017/out2017.geojson'], '#ffa500', 'out17')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2017/reg17.geojson'], '#8c8c8c', 'reg17')
// 2018
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2018/amp2018.geojson'], '#939', 'amp18')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2018/const2018.geojson'], '#f00', 'const18')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2018/dem2018.geojson'], '#ff0', 'dem18')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2018/leg2018.geojson'], '#000', 'leg18')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2018/out2018.geojson'], '#ffa500', 'out18')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2018/reg2018.geojson'], '#8c8c8c', 'reg18')
// 2019
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2019/amp2019.geojson'], '#939', 'amp19')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2019/const2019.geojson'], '#f00', 'const19')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2019/dem2019.geojson'], '#ff0', 'dem19')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2019/leg2019.geojson'], '#000', 'leg19')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2019/out2019.geojson'], '#ffa500', 'out19')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2019/reg2019.geojson'], '#8c8c8c', 'reg19')
// 2020
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2020/amp2020.geojson'], '#939', 'amp20')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2020/const2020.geojson'], '#f00', 'const20')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2020/dem2020.geojson'], '#ff0', 'dem20')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2020/leg2020.geojson'], '#000', 'leg20')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2020/out2020.geojson'], '#ffa500', 'out20')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2020/reg2020.geojson'], '#8c8c8c', 'reg20')
// 2021
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2021/amp2021.geojson'], '#939', 'amp21')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2021/const2021.geojson'], '#f00', 'const21')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2021/dem2021.geojson'], '#ff0', 'dem21')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2021/leg2021.geojson'], '#000', 'leg21')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2021/out2021.geojson'], '#ffa500', 'out21')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2021/reg2021.geojson'], '#8c8c8c', 'reg21')
// 2022
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2022/amp22.geojson'], '#939', 'amp22')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2022/const2022.geojson'], '#f00', 'const22')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2022/dem2022.geojson'], '#ff0', 'dem22')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2022/leg2022.geojson'], '#000', 'leg22')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2022/out2022.geojson'], '#ffa500', 'out22')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2022/reg2022.geojson'], '#8c8c8c', 'reg22')
// 2023
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2023/amp2023.geojson'], '#939', 'amp23')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2023/const2023.geojson'], '#f00', 'const23')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2023/dem2023.geojson'], '#ff0', 'dem23')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2023/leg2023.geojson'], '#000', 'leg23')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2023/out2023.geojson'], '#ffa500', 'out23')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/alvara/2023/reg2023.geojson'], '#8c8c8c', 'reg23')

// Habite-se
// 2017
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2017/mis17.geojson'], '#939', 'mis17')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2017/multi17.geojson'], '#ffa500', 'multi17')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2017/nres17.geojson'], '#f00', 'nres17')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2017/uni17.geojson'], '#ff0', 'uni17')
// 2018
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2018/mis2018.geojson'], '#939', 'mis18')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2018/multi2018.geojson'], '#ffa500', 'multi18')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2018/nres2018.geojson'], '#f00', 'nres18')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2018/uni2018.geojson'], '#ff0', 'uni18')
// 2019
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2019/mis2019.geojson'], '#939', 'mis19')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2019/multi2019.geojson'], '#ffa500', 'multi19')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2019/nres2019.geojson'], '#f00', 'nres19')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2019/uni2019.geojson'], '#ff0', 'uni19')
// 2020
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2020/mis2020.geojson'], '#939', 'mis20')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2020/multi2020.geojson'], '#ffa500', 'multi20')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2020/nres2020.geojson'], '#f00', 'nres20')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2020/uni2020.geojson'], '#ff0', 'uni20')
// 2021
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2021/mis2021.geojson'], '#939', 'mis21')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2021/multi2021.geojson'], '#ffa500', 'multi21')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2021/nres2021.geojson'], '#f00', 'nres21')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2021/uni2021.geojson'], '#ff0', 'uni21')
// 2022
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2022/mis2022.geojson'], '#939', 'mis22')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2022/multi2022.geojson'], '#ffa500', 'multi22')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2022/nres2022.geojson'], '#f00', 'nres22')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2022/uni2022.geojson'], '#ff0', 'uni22')
// 2023
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2023/mis2023.geojson'], '#939', 'mis23')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2023/multi2023.geojson'], '#ffa500', 'multi23')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2023/nres2023.geojson'], '#f00', 'nres23')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/camadas/licenciamento/habitese/2023/uni2023.geojson'], '#ff0', 'uni23')

// ZPAs Regulamentadas
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/zpasreg/zpa01.geojson'], 'black', 'zpa_1')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/zpasreg/zpa02.geojson'], 'black', 'zpa_2')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/zpasreg/zpa03.geojson'], 'black', 'zpa_3')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/zpasreg/zpa04.geojson'], 'black', 'zpa_4')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/zpasreg/zpa05.geojson'], 'black', 'zpa_5')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/zpasreg/zpa06.geojson'], 'black', 'zpa_6')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/zpasreg/zpa07.geojson'], 'black', 'zpa_7')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/zpasreg/zpa08.geojson'], 'black', 'zpa_8')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/zpasreg/zpa09.geojson'], 'black', 'zpa_9')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/zpasreg/zpa010.geojson'], 'black', 'zpa_10')

// Dados ambientais
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/dadosambientais/geojson/rios.geojson'], 'black', 'da_rio')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/dadosambientais/geojson/lagoas.geojson'], 'black', 'da_lagoas')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/dadosambientais/geojson/nascentes.geojson'], 'black', 'da_nasc')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/dadosambientais/geojson/area_ent_nascentes.geojson'], 'black', 'da_nasc_ae')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/dadosambientais/geojson/brejos.geojson'], 'black', 'da_bre')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/dadosambientais/geojson/encostas.geojson'], 'black', 'da_enc')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/dadosambientais/geojson/manguezais.geojson'], 'black', 'da_mang')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/dadosambientais/geojson/falesias.geojson'], 'black', 'da_fal')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/dadosambientais/geojson/dunas.geojson'], 'black', 'da_dun')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/dadosambientais/geojson/recifes.geojson'], 'black', 'da_rec')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/dadosambientais/geojson/veg_dunar.geojson'], 'black', 'da_veg_dun')
criarcamada(mapa, ['https://cdn.jsdelivr.net/gh/DaltonCarv/RepositorioGit/dadosambientais/geojson/esp_prot.geojson'], 'black', 'da_espame')