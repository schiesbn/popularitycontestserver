/**
 * @author Björn Schießle <schiessle@owncloud.com>
 *
 * @copyright Copyright (c) 2015, ownCloud, Inc.
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */

(function ($, OC) {

	$(document).ready(function () {

		/**
		 * calculate random color for the charts
		 * @returns {string}
		 */
		var getRandomColor = function() {
			var letters = '0123456789ABCDEF'.split('');
			var color = '#';
			for (var i = 0; i < 6; i++ ) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		};

		/**
		 * add general statistics to the page
		 * @param instances how many instances are counted
		 * @param users statistics about the users
		 */
		var showGeneralStatistics = function(instances, users) {
			$('#instances span').text(instances);
			$('#maxUsers span').text(users['max']);
			$('#minUsers span').text(users['min']);
			$('#averageUsers span').text(users['average']);
		};

		/**
		 * draw the chart of enabled apps
		 *
		 * @param array data
		 */
		var appsChart = function (data) {
			var appLabels = new Array();
			var appValues = new Array();
			for (key in data) {
				appLabels.push(key);
				appValues.push(data[key]);
			}

			var appData = {
				labels: appLabels,
				datasets: [
					{
						label: "Enabled Apps",
						fillColor: "rgba(151,187,205,0.5)",
						strokeColor: "rgba(151,187,205,0.8)",
						highlightFill: "rgba(151,187,205,0.75)",
						highlightStroke: "rgba(151,187,205,1)",
						data: appValues
					}
				]
			};

			var ctx = document.getElementById("appChart").getContext("2d");
			var myBarChart = new Chart(ctx).Bar(appData);
		};

		/**
		 * draw the chart of php versions
		 *
		 * @param array data
		 */
		var phpVersionsChart = function (data) {
			var phpVersionsData = new Array();
			for (key in data) {
				phpVersionsData.push(
					{
						value: data[key],
						color: getRandomColor(),
						label: 'PHP ' + key
					}
				);

			}
			var ctx = document.getElementById("phpChart").getContext("2d");
			var myPieChart = new Chart(ctx).Pie(phpVersionsData);

		};

		/**
		 * draw the chart of ownCloud versions
		 *
		 * @param array data
		 */
		var ocVersionsChart = function (data) {
			var ocVersionsData = new Array();
			for (key in data) {
				ocVersionsData.push(
					{
						value: data[key],
						color: getRandomColor(),
						label: 'ownCloud ' + key
					}
				);

			}
			var ctx = document.getElementById("ocVersionChart").getContext("2d");
			var myPieChart = new Chart(ctx).Pie(ocVersionsData);

		};

		$.get(
			OC.generateUrl('/apps/popularitycontestserver/api/v1/data'), {}
		).done(
			function (data) {
				showGeneralStatistics(data['instances'], data['users']);
				appsChart(data['apps']);
				phpVersionsChart(data['system']['phpversion']);
				ocVersionsChart(data['system']['ocversion']);
			}
		);

	});

})(jQuery, OC);