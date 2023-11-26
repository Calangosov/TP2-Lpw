//////////////////////////////////////////////////////////////////////
//                           LOGIN                                  //
//////////////////////////////////////////////////////////////////////
let $loginDiv = $('#popup-log-in');
let $signupDiv = $('#popup-sign-up');
let $emailInput = $('input[type^=email]');
let $fundoEl = $('#fundo');
let $erro = $('.error');
//Janelas pop-up de cadastro e login
$fundoEl.click(fecharPopup);
$('.cadastrar').click(()=>{
    $signupDiv.addClass('aparece');
    $emailInput.val($('#login-email').val());
    $fundoEl.addClass('clicavel');
    $erro.html('');
});
$('#loginHeader').click(()=>{
    $loginDiv.addClass('aparece');
    $fundoEl.addClass('clicavel');
    $erro.html('');
});
$('#sign-up').click(()=>{
    let usuario = {
        nome: $('#nome-signup').val(),
        email: $('#email-signup').val(),
        senha: $('#senha-signup').val(),
        conteudo: null
    }
    if(usuario.nome == '' || usuario.email == '' || usuario.senha == ''){
      $erro.html('Não deixe os campos vazios.')
      return;
    }
    let nomeJaExiste = localStorage.getItem(usuario.nome);
    if(nomeJaExiste != undefined && nomeJaExiste != null)
        $erro.html('O nome de usuário já está em uso.');
    else{
        localStorage.setItem(usuario.nome, JSON.stringify(usuario));
        localStorage.setItem('usuarioAtual', usuario.nome);
        location.href = 'pagina-aplicacao.html'
    }
});
$('#log-in').click(()=>{
    let usuario = {
        nome: $('#nome-login').val(),
        senha: $('#senha-login').val()
    }
    let verificarAcesso = localStorage.getItem(usuario.nome);
    verificarAcesso = JSON.parse(verificarAcesso);
    
    if(verificarAcesso.senha != usuario.senha)
        $erro.html('Usuário ou senha incorretos.');
    else{
        localStorage.setItem('usuarioAtual', usuario.nome);
        location.href = 'pagina-aplicacao.html'
      }
    return;
});
function fecharPopup(){
    $fundoEl.removeClass('clicavel');
    if($loginDiv.hasClass('aparece'));
        $loginDiv.removeClass('aparece');
    if($signupDiv.hasClass('aparece'))
        $signupDiv.removeClass('aparece');
}

////////////////////////////////////////////////////////////////////// eu nao aguento mais querer fazer graça e
//                           LISTAS                                 // a fonte não ser monoespacada
//////////////////////////////////////////////////////////////////////

// Declarações de variável
let $nomeItemEl = $('#novo-item-nome');
let $linkCheckbox = $('#link-checkbox');
//let $imagemCheckbox = $('#imagem-checkbox');    Ideia descartada
let $adicionarButton = $('#incluir-novo-item');
let $linkInput = $('#link'); 
let $imgInput = $('#imagem');
let $errorMsg = $('#error');
$errorMsg.val('');
$errorMsg.fadeOut();
let usuarioAtual = localStorage.getItem('usuarioAtual'); // O valor da variavel nao passa de uma página pra outra
$('#nome-usuario').html(usuarioAtual);                   // por algum motivo
let infoAtual = localStorage.getItem(usuarioAtual);
infoAtual = JSON.parse(infoAtual);
// Modelo de object do vetor: 
let $itensLista;
if(infoAtual.conteudo == null || infoAtual.conteudo == undefined)
  $itensLista  = [
    {
      nome: 'Exemplo',
      categoria: 'undefined',
      marcado: false,
      link: 'https://youtu.be/dQw4w9WgXcQ?si=hh1Yq6fvgwBQ4cJp',
      imagem: null
      //imagem: add depois
    }];
else
  $itensLista = JSON.parse(infoAtual.conteudo);
//Insere item na lista, basicamente tradução do tarefas para procrastinar em jquery com adição
function insereItem($item){
    let $itemEl = $("<li>", {"class": `categoria-${$item.categoria}`});
    let $listaEl = $('#lista');
    $itemEl.addClass('item');

    if($item.marcado === true)
      $item.addClass('marcado');   // class não usada, mas que não aparecerá ao usuário
    if($item.link != undefined && $item.link != null && $item.link != '' && $item.link != 'https://'){
      let $itemLink = $("<a>", {"href": $item.link}); //Se for pra ter link, o texto muda no <a>
      $itemEl.append($itemLink);
      $itemLink.html($item.nome);
    }
    else 
      $itemEl.html($item.nome); //caso contrário muda no <li>

    $listaEl.prepend($itemEl);
    $linkInput.val('https://');
  }

function registrarItem(e){
    let $itemInput = $('#novo-item-nome');
    let $itemClasseEl = $('#item-categoria');
    let $itemAdd = {
      nome: $itemInput.val(),
      categoria: $itemClasseEl.val(),
      marcado: false, //Ideia descartada
      link: $linkInput.val(),
      imagem: null //Ideia descartada
    }
    if($itemInput.val() == ''){
      $errorMsg.html('Erro: O nome do item não pode estar vazio.')
      $errorMsg.fadeIn();
      return;
    }
    $errorMsg.fadeOut();
    $itemInput.val('');
    $itemInput.focus();
    $itensLista.push($itemAdd);
    insereItem($itemAdd);
  }
$('.item').remove(); //Remove itens de teste da lista
$itensLista = jQuery.makeArray($itensLista);
$itensLista.forEach(insereItem); 

$adicionarButton.click(registrarItem);

$('.categoria-undefined').remove(); //Remove qualquer item que tenha sido criado por erro
document.addEventListener('keypress', (e)=>{
  let tecla = e.key;
  if(tecla == 'Enter')
    registrarItem();
})

$linkInput.fadeOut();
$imgInput.fadeOut();

$('#link-checkbox').change(()=>{
  if($('#link-checkbox').prop( "checked" ))
    $linkInput.fadeIn();
  else
  $linkInput.fadeOut();
})
/*$('#imagem-checkbox').change(()=>{
  if($('#imagem-checkbox').prop( "checked" ))
    $imgInput.fadeIn();
  else
   $imgInput.fadeOut();
}); */

let $pesquisa = $('#pesquisa');
$pesquisa.change(()=>{
  if($pesquisa.val() != 'default'){
    console.log("pesquisa.val: " + $pesquisa.val())
    $('.item').detach();
    for(let item of $itensLista){
      console.log(item);
      if(item.categoria == $pesquisa.val())
        insereItem(item);
   }
  }
  else{
    $('.item').detach();
    $itensLista.forEach((insereItem));
  }
});


//Janela modal:
let $modalEl = $('#creditos');
$('#info').click(() => {
  $modalEl.addClass('aparece');
});

$modalEl.click(() => {
  $modalEl.removeClass('aparece');
});

//Salvar no webstorage
$('#salvar').click(()=>{
  let info = JSON.stringify($itensLista);
  infoAtual.conteudo = info;
  localStorage.setItem(usuarioAtual, JSON.stringify(infoAtual));
});