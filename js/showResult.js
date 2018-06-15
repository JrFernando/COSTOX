function processText(text){
  var form = new FormData();
  form.append('text', text);

  $.ajax({
    url: "find.php",
    data: form,
    async: false,
    processData: false,
    contentType: false,
    type: 'POST',
    complete: function (data) {
      var resp = data.responseText;

      if(resp === "Erro!" || resp == undefined){
        var p = document.getElementById("#messageModalErro");
        p.innerHTML = "Erro ao processar a imagem!";
        $("#modalErro").modal("open");
        return false;
      // } else if (resp == "null") {

      } else {
        addTable(JSON.parse(resp));
        return true;
      }
    }
  });
}

function addTable(json){
  var line;
  if(json == null){
    line = "<tr><td colspan=\"4\"><center><strong>Nenhum elemento encontrado!</strong></center></td>";
    $("#tabela").append(line);
  } else {
      json['result'].forEach(function(obj, index){
        line = "<tr><td class='compound_image'></td><td class='compound_info'>";
        line += '<h3>Compound CID</h3><p>';
        if (obj['cid']) {
          line += obj['cid'];
        } else {
          obj['cid'] = obj['compound_cid'];
          line += obj['compound_cid'];
        }
        line += '</p>';

        line += '<h3>INCHIKEY</h3><p>'+ obj['inchikey'] +'</p>';
        line += '<h3>Molecular Formula</h3><p>'+ obj['molecular_formula'] +'</p>';
        line += '<h3>Molecular Weight</h3><p>'+ obj['molecular_weight'] +'</p>';
        line += '<h3>Use Type</h3><p>'+ obj['use_type'] +'</p><h3>Name</h3><p>';
        if (obj['name']) {
          line += obj['name'];
        } else if (obj['name_preferred']) {
          line += obj['name_preferred'];
        } else {
          line += obj['name_traditional'];
        }
        line += '</p><h3>SMILES</h3><p>';
        if (obj['smiles_canonical']) {
          line += obj['smiles_canonical'];
        } else {
          line += obj['smiles_isomeric'];
        }

        compound_img = 'images/compounds/compound_'+obj['cid'] + '.png';
        $.ajax({
          url:compound_img,
          type:'HEAD',
          error: function()
          {
              //file not exists
          },
          success: function() {
              $('.compound_image')[index].innerHTML += '<img src="'+compound_img+'">';
          }
      });

        $("#tabela").append(line + "</p></td></tr>");
    });
  }
}
