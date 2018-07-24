/*		Javascript		*/
/*Math.seed(Date.UTC(new Date())); // Reiniciar semilla*/

//var movimientos = new Array();
var movimientos = [];  //array par aguardar los clicks que has de pulsar
var clicks = 0;
var t = null;
var i = 0;
var perdido = false;

function animacion(num) //Hacer la animacion del boton o de viaualización
{
	num = parseInt(num);
	if( num>0 && num<=5 )
	{
		num='#img'+num;
		var a = $(num).clone().removeClass("aimagenes");
		$(num).remove();
		$("#panel").append(a);
		$(num).addClass("aimagenes");	
	}
}

function getRandom(min, max)  // Generar numeros aleatorios
{
	return ( Math.floor(Math.random() * (max - min)) + min );
}
function addmovimiento() //Añadir numero aleatorio en el array
{
	movimientos.push(getRandom(1,6)); 
}

function vermovimientos() // Ver la lista de animaciones que se han de visualizar con un intervalo
{
	
	document.getElementById('test').innerHTML = '';
	i = 0;
	t = setInterval(function () 
	{
		document.getElementById('test').innerHTML = document.getElementById('test').innerHTML + movimientos[i]+',';
		animacion(movimientos[i]);
		if(i == movimientos.length-1 ) 
		{ 
			clearTimeout(t); t = null;
			disable_botones(false);
		}
		else { i++; }		
	},4000);
	
	
}
function play()
{
	disable_botones(true);
	document.getElementById('btstart').disabled = true;
	document.getElementById('btstart').style.opacity = 0.5;
	document.getElementById('btreset').disabled = false;
	document.getElementById('btreset').style.opacity = 1;
	addmovimiento();
	vermovimientos();
}
function resetear()
{
	for(var i=0;i<movimientos.length;i++) { movimientos.pop(); }
	movimientos.length = 0;
	movimientos = [];
	document.getElementById('test').innerHTML = "";
	document.getElementById('btstart').disabled = false;
	document.getElementById('btstart').style.opacity = 1;
	document.getElementById('btreset').disabled = true;
	document.getElementById('btreset').style.opacity = 0.5;
}

function movi_boton(num)
{
	num = parseInt(num);
	animacion(num);
	if(movimientos[clicks] == num && !perdido)
	{
		clicks++;
		if (clicks == movimientos.length) { clicks = 0; play(); }
	}
	else
	{
		perdido = true;
		disable_botones(true);
	}
}
function disable_botones(estado)
{
	var opacidad = 0;
	if(estado == true) { opacidad = 0.5;}
	else { opacidad = 1; }
	
	document.getElementById('bt1').disabled = estado;
	document.getElementById('bt2').disabled = estado;
	document.getElementById('bt3').disabled = estado;
	document.getElementById('bt4').disabled = estado;
	document.getElementById('bt5').disabled = estado;
	
	document.getElementById('bt1').style.opacity = opacidad;
	document.getElementById('bt2').style.opacity = opacidad;
	document.getElementById('bt3').style.opacity = opacidad;
	document.getElementById('bt4').style.opacity = opacidad;
	document.getElementById('bt5').style.opacity = opacidad;
}