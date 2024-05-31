let key = "fa03da1a07fe1a541e99efc754b5243f";

function colocarNaTela(dados) {
    console.log(dados);
    document.querySelector(".city").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
    
    atualizarPlanoDeFundo(dados.weather[0].description);
}

async function buscarCidade(cidade) {
    try {
        let resposta = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
        cidade + 
        "&appid=" + 
        key + 
        "&lang=pt_br" +
        "&units=metric"
        );
        
        if (!resposta.ok) {
            throw new Error('Cidade não encontrada');
        }

        let dados = await resposta.json();
        colocarNaTela(dados);
    } catch (erro) {
        console.error(erro);
        alert('Erro ao buscar a cidade. Verifique se o nome da cidade está correto.');
    }
}

function clickOnButton() {
    let cidade = document.querySelector(".input-city").value;
    buscarCidade(cidade);
}

function atualizarPlanoDeFundo(previsao) {
    const previsaoNormalizada = previsao.trim().toLowerCase();

    if (previsaoNormalizada === "nublado") {
        document.body.style.backgroundImage = "url('imagens/nublado.jpg')";
    } else if (previsaoNormalizada === "céu limpo") {
        document.body.style.backgroundImage = "url('imagens/sol.jpg')";
    } else if (previsaoNormalizada === "nuvens dispersas") {
        document.body.style.backgroundImage = "url('imagens/nuvens.jpg')";
    } else if (previsaoNormalizada === "algumas nuvens") {
        document.body.style.backgroundImage = "url('imagens/solnuvem.jpg')";
         } else if (previsaoNormalizada === "névoa") {
        document.body.style.backgroundImage = "url('imagens/nevoa.jpg')";
    } else if (previsaoNormalizada === "tempestade/chuvas intensas") {
        document.body.style.backgroundImage = "url('imagens/tempestade.jpg')";
    } else if (previsaoNormalizada === "chuva leve") {
        document.body.style.backgroundImage = "url('imagens/chuva.jpg')";
    } else {
        document.body.style.backgroundImage = "url('imagens/paisagem.jpg')"; 
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const previsaoElement = document.querySelector(".previsao");
    if (previsaoElement) {
        atualizarPlanoDeFundo(previsaoElement.textContent);
    }
});
