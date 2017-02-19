function initViz() {
			containerDiv = document.getElementById('vizContainer');
			url = "https://public.tableau.com/views/3D_Othographic/earth?:embed=yes&:display_count=no";
			options = {
				//hideToolbar: true,
				hideTabs: true,
				onFirstInteractive: function() {
					urlquery = window.location.href;
					if(urlquery.indexOf('?lat=') != -1 || urlquery.indexOf('&lat=') != -1) {
						lat = parseInt(getUrlParameter('lat'));
						if(typeof lat == 'number' && lat >= -90 && lat <= 90) {
							viz.getWorkbook().changeParameterValueAsync('Phi_0',lat);
							}
					}
					if(urlquery.indexOf('?lon=') != -1 || urlquery.indexOf('&lon=') != -1) {
						lon = parseInt(getUrlParameter('lon'));
						if(typeof lon == 'number' && lon >= -180 && lon <= 180) {
							viz.getWorkbook().changeParameterValueAsync('Lambda_0',lon);
						}
					}
					if(urlquery.indexOf('?rotate=') != -1 || urlquery.indexOf('&rotate=') != -1) {
						r = parseInt(getUrlParameter('rotate'));
						if(typeof r == 'number' && r >= -180 && r <= 180) {
							viz.getWorkbook().changeParameterValueAsync('R',r);
						}
					}
				}
			}
			viz = new tableau.Viz(containerDiv, url, options); 
			
		};
		function getUrlParameter(name) {
			name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
			var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
			var results = regex.exec(location.search);
			return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
		};
		function main() {
			initViz();
		};