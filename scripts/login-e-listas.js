// Declarações de variável
let $nomeItemEl = $('#novo-item-nome');
let $linkCheckbox = $('#link-checkbox');
let $imagemCheckbox = $('#imagem-checkbox');
let $categoriaSelector = $('#item-categoria');
let $adicionarButton = $('#incluir-novo-item');
let $linkInput = $('#link');
let $imagemInput = $('#imagem');

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
    $itemEl.html($item.nome);
    $itemEl.addClass('item');

    if($item.marcado === true)
      $item.addClass('marcado');
  
    $listaEl.prepend($itemEl);
  }
$adicionarButton.click(e =>{

})

function registrarItem(e){
    let $itemInput = $('#novo-item-nome');
    let $itemClasseEl = $('#item-categoria');
    let $itemAdd = {
      nome: $itemInput.val(),
      categoria: $itemClasseEl.val(),
      marcado: false,
      link: null,
      imagem: null
    }
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
$('#link').fadeOut();
$('#imagem').fadeOut();
$adicionarButton.click(registrarItem);

document.addEventListener('keypress', (e)=>{
  let tecla = e.key;
  if(tecla == 'Enter')
    registrarItem();
})

