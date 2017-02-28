var formElement = null;
var sol_text1 = null;
var sol_text2 = null;
var sol_select1 = null;
var sol_select2 = null;
var sol_chk1 = [];
var sol_chk2 = [];
var sol_multiple1 = [];
var sol_multiple2 = [];
var sol_radio1 = null;
var sol_radio2 = null;
var click=false;

//*******************************************************************************
//Al cargar pagina
window.onload = function(){
	
//CORREGIR al apretar el botón.
  formElement=document.getElementById("comprobar");
  formElement.onclick=function()
	{    
	  corregir();
	  click=true;
	};
	//CORREGIR al apretar el botón.
  //Leer XML 
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function()
	{
      if (this.readyState == 4 && this.status == 200)
		{
		  gestionarXml(this);

		}
  };
 

 
  xhttp.open("GET", "https://rawgit.com/Fpocovi/UAP/master/xml/questions2.xml", true);
  xhttp.send();
};


function corregir()
{
  inicializar();
  corregirRadio("Nº 1: ","resp1",sol_radio1);
  corregirCheckbox("Nº 2: ","resp2",sol_chk1);
  corregirText("Nº 3: ","resp3",sol_text1);
  corregirMulti1("Nº 4: ","resp4",sol_multiple1);
  corregirRadio("Nº 5: ","resp5",sol_radio2);
  corregirSelect("Nº 6:","resp6",sol_select1);
  corregirMulti1("Nº 7: ","resp7",sol_multiple2); 
  corregirCheckbox("Nº 8: ","resp8",sol_chk2);
  corregirSelect("Nº 9:","resp9",sol_select2);
  corregirText("Nº 10: ","resp10",sol_text2);
  presentarNota();
}
//**************************************************************************
//Rellenamos la página con el contenido de esta.
function gestionarXml(contXml)
{
  var xmlDoc = contXml.responseXML;       
  //Pregunta 1 tipo radio
  document.getElementById('preg1').innerHTML=xmlDoc.getElementsByTagName("title")[0].innerHTML;
  sol_radio1 = xmlDoc.getElementById("UAP_HE1").getElementsByTagName("answer")[0].innerHTML;
  select=document.getElementById("resp1");
  nopciones = xmlDoc.getElementById("UAP_HE1").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    entrada = document.createElement("input");
    entrada.type = xmlDoc.getElementsByTagName("type")[0].innerHTML;
    entrada.value=i+1;
    entrada.name=entrada.type;
    select.appendChild(entrada);
    select.innerHTML += xmlDoc.getElementById("UAP_HE1").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="<br/>";
  } 
  //Pregunta 2 checkbox
  document.getElementById("preg2").innerHTML = xmlDoc.getElementsByTagName("title")[1].innerHTML;
  select= document.getElementById("resp2");
  nopciones = xmlDoc.getElementById("UAP_HE2").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    entrada = document.createElement("input");
    entrada.type = xmlDoc.getElementsByTagName("type")[1].innerHTML;
    entrada.name = entrada.type;
    entrada.value=i+1;
    select.appendChild(entrada);
    select.innerHTML += xmlDoc.getElementById("UAP_HE2").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="<br/>";
  }
  
  nres = xmlDoc.getElementById("UAP_HE2").getElementsByTagName('answer').length;
  for (i = 0; i < nres; i++)
  { 
    sol_chk1[i]=xmlDoc.getElementById("UAP_HE2").getElementsByTagName("answer")[i].innerHTML;
  }
  //Pregunta 3 tipo text
  document.getElementById("preg3").innerHTML = xmlDoc.getElementsByTagName("title")[2].innerHTML;
  sol_text1 = xmlDoc.getElementById("UAP_HE3").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select= document.getElementById("resp3");
  var entrada = document.createElement("input");
  entrada.type = xmlDoc.getElementsByTagName("type")[2].innerHTML;
  entrada.name = "text1";
  entrada.autocomplete="off";
  select.appendChild(entrada);
  pregunta1 = "Pregunta 3:"
  respuesta1 = "resp3";
  
  //Pregunta 4 tipo select multiple
  document.getElementById("preg4").innerHTML = xmlDoc.getElementsByTagName("title")[3].innerHTML;
  var nres = xmlDoc.getElementById("UAP_HE4").getElementsByTagName("answer").length;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  for (i = 0; i < nres; i++)
  {
    sol_multiple1[i] = xmlDoc.getElementById("UAP_HE4").getElementsByTagName("answer")[i].innerHTML;
  }
  select = document.getElementById("resp4");
  select.multiple = true;    
  nopciones = xmlDoc.getElementById("UAP_HE4").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    option = document.createElement("option");
    option.text = xmlDoc.getElementById("UAP_HE4").getElementsByTagName("option")[i].innerHTML;
    option.value=i+1;
    select.appendChild(option);
  } 

  //Pregunta 5 tipo 'radio' nº 2.*/

  document.getElementById('preg5').innerHTML=xmlDoc.getElementsByTagName("title")[4].innerHTML;
  sol_radio2 = xmlDoc.getElementById("UAP_HE5").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select=document.getElementById("resp5");
  nopciones = xmlDoc.getElementById("UAP_HE5").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    entrada = document.createElement("input");
    entrada.type = xmlDoc.getElementsByTagName("type")[4].innerHTML;
    entrada.value=i+1;
    entrada.name=entrada.type;
    select.appendChild(entrada);
    select.innerHTML += xmlDoc.getElementById("UAP_HE5").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="<br/>";
  } 
  //Pregunta 6 tipo select
  document.getElementById("preg6").innerHTML = xmlDoc.getElementsByTagName("title")[5].innerHTML;
  sol_select1 = xmlDoc.getElementById("UAP_HE6").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select = document.getElementById("resp6");
  nopciones = xmlDoc.getElementById("UAP_HE6").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    option = document.createElement("option");
    option.text = xmlDoc.getElementById("UAP_HE6").getElementsByTagName("option")[i].innerHTML;
    option.value=i+1;
    select.appendChild(option);
  } 
  //Pregunta tipo select multiple
  document.getElementById("preg7").innerHTML = xmlDoc.getElementsByTagName("title")[6].innerHTML;
  for (i = 0; i < nres; i++)
  {
    sol_multiple2[i] = xmlDoc.getElementById("UAP_HE7").getElementsByTagName("answer")[i].innerHTML;
  }
  select = document.getElementById("resp7");
  select.multiple = true;    
  nopciones = xmlDoc.getElementById("UAP_HE7").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    option = document.createElement("option");
    option.text = xmlDoc.getElementById("UAP_HE7").getElementsByTagName("option")[i].innerHTML;
    option.value=i+1;
    select.appendChild(option);
  } 
  //Pregunta 8 tipo checkbox
  document.getElementById('preg8').innerHTML = xmlDoc.getElementsByTagName("title")[7].innerHTML;
  select= document.getElementById("resp8");
  nopciones = xmlDoc.getElementById("UAP_HE8").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    entrada = document.createElement("input");
    entrada.type = xmlDoc.getElementsByTagName("type")[7].innerHTML;
    entrada.name = entrada.type;
    entrada.value=i+1;
    select.appendChild(entrada);
    select.innerHTML += xmlDoc.getElementById("UAP_HE8").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="<br/>";
  }
  nres = xmlDoc.getElementById("UAP_HE8").getElementsByTagName('answer').length;
  for (i = 0; i < nres; i++)
  { 
    sol_chk2[i]=xmlDoc.getElementById("UAP_HE8").getElementsByTagName("answer")[i].innerHTML;
  }
  // Pregunta 9 tipo select
  document.getElementById("preg9").innerHTML = xmlDoc.getElementsByTagName("title")[8].innerHTML;
  sol_select2 = xmlDoc.getElementById("UAP_HE9").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select = document.getElementById("resp9");
  var nopciones = xmlDoc.getElementById("UAP_HE9").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    option = document.createElement("option");
    option.text = xmlDoc.getElementById("UAP_HE9").getElementsByTagName("option")[i].innerHTML;
    option.value=i+1;
    select.appendChild(option);
  } 
  // Pregunta 10 tipo texto
  document.getElementById("preg10").innerHTML = xmlDoc.getElementsByTagName("title")[9].innerHTML;
  sol_text2 = xmlDoc.getElementById("UAP_HE10").getElementsByTagName("answer")[0].innerHTML;
  select= document.getElementById("resp10");
  entrada = document.createElement("input");
  entrada.type = xmlDoc.getElementsByTagName("type")[9].innerHTML;
  entrada.name = "text2";
  entrada.autocomplete="off";
  select.appendChild(entrada);
  }
//*************************************************************************************************************
//Implementación de la corrección de cada pregunta. se ha creado una funcion con parametros para ahorrar codigo

//corregir tipo text
function corregirText(resptext,pregtext,soltext)
{
  var s = document.getElementById(pregtext).getElementsByTagName("input")[0].value;
  if (s.toUpperCase()==soltext.toUpperCase())
  {
    darRespuestaHtml(resptext + "Correcto","green");
    nota +=1;
  }
  else
  {
    if (s.toUpperCase()!=soltext.toUpperCase())
    {
      darRespuestaHtml(resptext + "Respuesta incorrecta","red");
    }
    else
    {
      darRespuestaHtml(resptext + "Respuesta incorrecta","red");
    }
  }
}
//corregir select
function corregirSelect(respselect,pregselect,solselect)
{
  var sel = document.getElementById(pregselect);  
  if (sel.selectedIndex==solselect)
  {
    darRespuestaHtml(respselect + "Correcto","green");
    nota +=1;
  }
  else {darRespuestaHtml(respselect + "Respuesta incorrecta","red");}
}
function corregirMulti1(respmulti,pregmulti,solmulti)
{
  var v=[];
  var corr=0;
  var opt = document.getElementById(pregmulti).getElementsByTagName("option");

  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].selected) 
    {
      v[i]=false;
      for (j = 0; j < solmulti.length; j++) 
      {
        if(i==solmulti[j]) {v[i]=true;}
      }
    }
  }
  for (i = 0; i < opt.length; i++) 
  {   
    if (opt[i].selected) 
    {
      if (v[i]) {nota +=1.0/solmulti.length; corr++;}
      else {nota -=1.0/solmulti.length; corr--;} 
    }
  }
  if (corr==solmulti.length) {darRespuestaHtml(respmulti + "Correcto","green");}

  //***** intentar poner respuesta parcial******

  else {darRespuestaHtml(respmulti + "Respuesta incorrecta","red");}
}
//Corregir checkbox
function corregirCheckbox(respchk,pregchk,solchk)
{
  var v=[];
  var corr=0;
  var opt = document.getElementById(pregchk).elements["checkbox"];

  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) 
    {
      v[i]=false;
      for (j = 0; j < solchk.length; j++) 
      {
        if(i==solchk[j]) {v[i]=true;}
      }
    }
  }

  for (i = 0; i < opt.length; i++) 
  {   
    if (opt[i].checked) 
    {
      if (v[i]) {nota +=1.0/solchk.length; corr++;}
      else {nota -=1.0/solchk.length; corr--;}
    }
  }
  if (corr==solchk.length) {darRespuestaHtml(respchk + "Correcto","green");}
  else {darRespuestaHtml(respchk + "Respuesta incorrecta","red");}
}
//Corregir radio
function corregirRadio(respradio,pregradio,solradio)
{
  var r=null;
  var opt = document.getElementById(pregradio).elements["radio"];
  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) {r=i;}
  }
  if(r==solradio) {darRespuestaHtml(respradio + "Correcto","green"); nota +=1;}
  else {darRespuestaHtml(respradio + "Respuesta incorrecta","red");}
}
//****************************************************************************************************************
//Gestionar la presentación de las respuestas.
function darRespuestaHtml(r,color,negrita){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultados').appendChild(p).style.color=(color);
 document.getElementById('resultados').appendChild(p).style.fontWeight=(negrita);
}
function presentarNota()
{
	if (nota>=5){
  darRespuestaHtml("Nota: "+nota+" punto/s sobre 10","green","900");
}else{  
	darRespuestaHtml("Nota: "+nota+" punto/s sobre 10","red","900");
}
}

function inicializar()
{
  var v=document.getElementById("resultados");
  v.innerHTML="";
  nota=0.0;
}

//*********************************************************************************************

