document.addEventListener("DOMContentLoaded", function () {
	var  game = document.querySelector(".ttt");
	function TicTacToe(element) {
			var current = 0,
				players = ["x", "o"],
				field = document.createElement("table"),
				caption = document.createElement("caption"),
				messages = {
					"o": "Ход делает нолик.",
					"x": "Ход делает крестик.",
					"o-win": "Нолики выиграли!",
					"x-win": "Крестики выиграли!",
					"draw": "Ничья."
				},
				finished, tr,
				xWin = 0, oWin = 0, draw = 0,
				i, j, k;
				
				document.getElementsByName("newgame")[0].addEventListener("click", function () {
						var cells = field.getElementsByTagName("td");
						current = 0;
						caption.innerHTML = messages[players[current]];
						finished = false;
						for (i = 0; i < 3; i++) {
							for (j = 0; j < 3; j++) {
								cells[i * 3 + j].removeAttribute("class");
							}
						}
					});
				    
				document.getElementsByName("reset")[0].addEventListener("click", function () {
						xWin = 0;
						oWin = 0;
						draw = 0;
						var divs = document.getElementsByTagName("div");
						divs[3].innerHTML = "Победы крестиков: " + xWin;
						divs[4].innerHTML = "Победы ноликов: " + oWin;
						divs[5].innerHTML = "Ничьи: " + draw;
					});

			element.appendChild(field);
			field.appendChild(caption);
			caption.innerHTML = messages[players[current]];			
			field.appendChild(document.createElement("tbody"));
			for ( i = 0; i < 3; i++) {
				tr = document.createElement("tr");
				field.lastChild.appendChild(tr);
				for ( j = 0; j < 3; j++) {
					tr.appendChild(document.createElement("td"));
				}
			}
			
			function end() {
				var td = field.getElementsByTagName("td"),
					full = true,
					winner, i,
					div = document.getElementsByTagName("div");
				
				for (i = 0; i < td.length; i++) {
					if (td[i].className == "") {
						full = false;
					}
				}
				
				for (i = 0; i < 3; i++) {
					if (td[0 + i].className != "" && td[0 + i].className == td[3 + i].className &&
						td[3 + i].className == td[6 + i].className) {
						winner = td[0 + i].className;
						highlightCells([
						td[i], td[3 + i], td[6 + i]
					]);
					}
					if (td[i * 3 + 0].className != "" && td[i * 3 + 0].className == td[i *
							3 + 1].className && td[i * 3 + 1].className == td[i * 3 + 2].className) {
						winner = td[i * 3].className;
						highlightCells([
						td[i * 3], td[i * 3 + 1], td[i * 3 + 2]
					]);
					}
				}
				if (td[0].className != "" && td[0].className == td[4].className &&
					td[4].className == td[8].className) {
					winner = td[0].className;
					highlightCells([
					td[0], td[4], td[8]
				]);
				}
				if (td[2].className != "" && td[2].className == td[4].className &&
					td[4].className == td[6].className) {
					winner = td[2].className;
					highlightCells([
					td[2], td[4], td[6]
				]);
				}
				if (full || winner) {
					finished = true;
					if (winner) {
						caption.innerHTML = messages[players[current] + "-win"];
						if(winner == "x"){
							xWin++;
							div[3].innerHTML = "Победы крестиков: " + xWin;
						} 
						else{
							oWin++;
							div[4].innerHTML = "Победы ноликов: " + oWin;
						}
					} else {
						caption.innerHTML = messages["draw"];
						draw++;
						div[5].innerHTML = "Ничьи: " + draw; 
					}
				}
			}
								
			function highlightCells(cells) {
					cells.forEach(function (node) {
						node.classList.add("highlighted");
					});
				}
				
			field.addEventListener("click", function (event) {
					var td = event.target;
					if (!finished && td.tagName.toLowerCase() == "td" && td.className.length <
						1) {
						td.className = players[current];
						end(); 
						if (!finished) {
							current = 1 - current; 
							caption.innerHTML = messages[players[current]];
						}
					}
				});
		}
	
		TicTacToe(game); 
});
