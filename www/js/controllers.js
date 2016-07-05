angular.module('monksOnTap.controllers', [])

.controller('MonksCtrl', function($scope, $http, $sce) {
	$scope.tapList = [];
	$http.get("http://localhost:1337/fbpage.digitalpour.com/?companyID=533db384fb890c13349fa31f&locationID=1")
		.success(function(data) {
			var parser = new DOMParser();
			var doc = parser.parseFromString(data, 'text/html');
			var list = doc.firstChild.querySelectorAll('li');
			$scope.test = list[0].firstChild.nextElementSibling.children[2].children[2].style["background-color"];
			var x = 0;
			for (i=0; i<list.length; i++){
				if (list[i].firstChild != null){
					var done = false;
					var x = 2;
					while (!done){
						if (list[i].firstChild.nextElementSibling.children[x].children[0].innerHTML!=""){
							done = true;
						}
						else{
							x++;
						}
					}
					if (x===2){
						$scope.tapList.push({
							id:list[i].firstChild.nextElementSibling.children[0].innerHTML,
							image:list[i].firstChild.nextElementSibling.children[1].firstChild.src,
							producer:list[i].firstChild.nextElementSibling.children[x].children[0].innerHTML,
							name:list[i].firstChild.nextElementSibling.children[x].children[1].innerHTML,
							color:list[i].firstChild.nextElementSibling.children[x].children[2].style["background-color"],
							style:list[i].firstChild.nextElementSibling.children[x].children[3].innerHTML,
							location:list[i].firstChild.nextElementSibling.children[x].children[4].innerHTML,
							abv:list[i].firstChild.nextElementSibling.children[x].children[5].innerHTML.replace(/&nbsp;/gi,''),
							ibu:list[i].firstChild.nextElementSibling.children[x].children[6].innerHTML
						});
					}
					else{
						$scope.tapList.push({
							id:list[i].firstChild.nextElementSibling.children[0].innerHTML,
							image:list[i].firstChild.nextElementSibling.children[1].firstChild.src,
							producer:list[i].firstChild.nextElementSibling.children[x].children[0].innerHTML,
							name:list[i].firstChild.nextElementSibling.children[x].children[1].innerHTML,
							color:list[i].firstChild.nextElementSibling.children[x].children[2].style["background-color"],
							style:list[i].firstChild.nextElementSibling.children[x].children[4].innerHTML,
							location:list[i].firstChild.nextElementSibling.children[x].children[5].innerHTML,
							abv:list[i].firstChild.nextElementSibling.children[x].children[6].innerHTML.replace(/&nbsp;/gi,'')
						});
					}
				}
			}
		})
		.error(function(data) {
			alert("ERROR");
		});
});