// let consultaCEP = fetch('https://viacep.com.br/ws/01001000/json/') //solicitação para API
//     .then(resposta => resposta.json())  //responsta - objeto RESPONSE convertendo json
//     .then(r => { //já em json pode ser utilizada
//         if (r.erro) {
//             throw Error('Esse CEP não existe!') //passa o Error utilizando throw para pegar o erro do CATCH 
//         } else
//             console.log(r)
//     })
//     .catch(erro => console.log(erro)) //pega o erro no log
//     .finally(mensagem => console.log('Processamento concluído!')) //finalmente = resposta do retorno

// console.log(consultaCEP) //vai retornar uma Promisse(promessa de que algo acontecerá - resolvida ou rejeitada)

async function buscaEndereco(cep) {

    let mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ""

    try { 
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`) //await só para func assincrona
        let consultaCEPConvertida = await consultaCEP.json()
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!')
        }

        let cidade = document.getElementById('cidade')
        let logradouro = document.getElementById('endereco')
        let bairro = document.getElementById('bairro')
        let estado = document.getElementById('estado')

        cidade.value = consultaCEPConvertida.localidade
        logradouro.value = consultaCEPConvertida.logradouro
        bairro.value = consultaCEPConvertida.bairro
        estado.value = consultaCEPConvertida.uf

        console.log(consultaCEPConvertida)
        return consultaCEPConvertida
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro)
    }

}

let cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value))


//EXEMPLO DE VÁRIAS REQUISIÇÕES
// let ceps = ['01001000', '01001001']
// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores))
// Promise.all(conjuntoCeps).then(respostas => console.log(respostas)) //faz várias reqs ao mesmo tempo com Promisse.all



// Dentro da área de experiência do usuário, os designers estudam as heurísticas de Nielsen, que ajudam a projetar uma boa interface e por consequência uma ótima experiência de uso, durante o desenvolvimento desse projeto foi pensado em duas delas:

// Prevenção de erros
// Não é uma boa ideia deixar seu usuário errar sem explicar previamente o motivo do erro. Melhor do que isso, tente criar uma interface que permita ao usuário não errar. Para isso, aplicamos o mecanismo de auto completar o endereço de acordo com o CEP do usuário, evitando que os dados sejam enviados errados e ele não consiga receber seu pedido.

// Ajude os usuários a reconhecerem, diagnosticarem e recuperarem-se de erros.
// As mensagens de erros tem que ser claras e próximas do conteúdo ou ação que causou o erro. Por isso, aplicamos uma mensagem que aparece abaixo do campo de CEP caso o usuário digite ele incorretamente. Isso ajudará a detectar e resolver possíveis problemas.