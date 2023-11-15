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
    link: 'https://youtu.be/dQw4w9WgXcQ?si=hh1Yq6fvgwBQ4cJp',
    marcado: false
    //imagem: add depois
  }];

function insereItem($item){
    const $itemEl = $("<li>", {"class": `categoria-${$item.categoria} item`});
    const $elementosListaEl = $('.item');
    $itemEl.html($item.nome);
    $itemEl.addClass('item');

    if($item.marcado === true)
      $item.addClass('marcado');
    $elementosListaEl[0].before($item);
  }
$adicionarButton.click(e =>{

})

function registrarItem(e){
    let $itemInput = $('#novo-item-nome');
    let $itemClasseEl = $('#nova-tarefa-categoria');
    let $itemAdd = {
      nome: $itemInput.value(),
      categoria: $itemClasseEl.value(),
      marcado: false
    }
    $itemInput.value('');
    $itemInput.focus();
    $itensLista.push($itemAdd);
    insereItem($itemAdd);
  }
const $removerItem = $('.item');
$removerItem.each( item =>{
    item.remove();
});

