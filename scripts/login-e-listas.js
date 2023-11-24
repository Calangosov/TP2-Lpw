// Declarações de variável
let $nomeItemEl = $('#novo-item-nome');
let $linkCheckbox = $('#link-checkbox');
let $imagemCheckbox = $('#imagem-checkbox');
let $adicionarButton = $('#incluir-novo-item');
let $linkInput = $('#link'); 
let $imgInput = $('#imagem');
let $errorMsg = $('#error');
$errorMsg.val('');
$errorMsg.fadeOut();
// Modelo de object do vetor: 
let $itensLista = [
  {
    nome: 'Exemplo',
    categoria: 'jogo',
    marcado: false,
    link: 'https://youtu.be/dQw4w9WgXcQ?si=hh1Yq6fvgwBQ4cJp',
    imagem: null
    //imagem: add depois
  }];

function insereItem($item){
    let $itemEl = $("<li>", {"class": `categoria-${$item.categoria}`});
    let $listaEl = $('#lista');
    $itemEl.addClass('item');

    if($item.marcado === true)
      $item.addClass('marcado');
    if($item.link != undefined && $item.link != null && $item.link != '' && $item.link != 'https://'){
      let $itemLink = $("<a>", {"href": $item.link});
      $itemEl.append($itemLink);
      $itemLink.html($item.nome);
    }
    else 
      $itemEl.html($item.nome);
    
    $listaEl.prepend($itemEl);
    $linkInput.val('https://');
  }

function registrarItem(e){
    let $itemInput = $('#novo-item-nome');
    let $itemClasseEl = $('#item-categoria');
    let $itemAdd = {
      nome: $itemInput.val(),
      categoria: $itemClasseEl.val(),
      marcado: false,
      link: $linkInput.val(),
      imagem: null
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
$itensLista.forEach((item)=>{
  insereItem(item);
});

$adicionarButton.click(registrarItem);

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
$('#imagem-checkbox').change(()=>{
  if($('#imagem-checkbox').prop( "checked" ))
    $imgInput.fadeIn();
  else
   $imgInput.fadeOut();
});
/*let $pesquisa = $('#pesquisar');
$pesquisa.change(()=>{
  if($pesquisa.val() != 'default'){
    $('.item').remove();
   for(let item of $itensLista){
    if(item.categoria == $pesquisa.val())
      //Faz o append na lista. O else só volta o append de todo mundo
   }
  }
});*/