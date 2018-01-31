function processFile(pathFile){

  var form = new FormData();
  form.append('pathFile', pathFile);

  $.ajax({
    url: "new_find.php",
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
    json.forEach(function(obj, index){
      line = "<tr><td>" + obj[4] + "</td>" +
                "<td>" + obj[5] + "</td>" +
                "<td>" + obj[6] + "</td>" +
                "<td>" + obj[13] + "</td></tr>";

      $("#tabela").append(line);
    });
  }
}
