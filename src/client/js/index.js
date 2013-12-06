(function() {
	var app = window.ChordGrids = (window.ChordGrids || {});

	$(document).ready(function() {
		
		var col = new app.ChordGridCollection();
		var gridCollectionView = new app.ChordGridCollectionView({ collection: col }).render();
		col.set([new app.ChordGrid()]);
		
		var controlsView = new app.ControlsView().render();
		controlsView.on('zoom', function(delta) {
			gridCollectionView.doZoom(delta);
		});

		$('#content').append(gridCollectionView.$el);
		$('#content').append(controlsView.$el);

		$('body').on('mousewheel', function(e) {
			if (e.metaKey) {
				var delta = 1.0 - e.originalEvent.deltaY / 100;
				var focalPoint = { x: e.clientX, y: e.clientY };
				gridCollectionView.doZoom(delta, focalPoint);
				return false;
			}
		});

		$('.newBtn').click(function() {
			var arr = [ new app.ChordGrid() ];
			col.set(arr);
		});

		$('.loadBtn').click(function() {
			//col.load('[{"name":"D","fret":"5","data":[[0,0,0,0,0,0],[0,1,0,4,3,0],[0,0,0,3,4,0],[0,0,0,2,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]},{"name":"G","fret":"3","data":[[0,0,0,0,0,0],[1,0,1,1,0,0],[0,0,0,0,0,0],[0,2,4,0,0,0],[0,0,0,0,1,1],[0,0,0,0,0,0]]},{"name":"C","fret":"5","data":[[0,0,0,0,0,0],[0,0,0,2,4,0],[0,0,0,4,0,0],[0,1,0,3,0,0],[1,0,4,0,0,0],[0,0,3,0,0,0]]},{"name":"F","fret":"5","data":[[0,0,0,0,0,0],[0,0,0,1,1,1],[0,0,0,0,0,0],[0,0,2,0,0,0],[0,1,0,0,0,0],[0,0,0,0,0,0]]},{"name":"B","fret":5,"data":[[0,0,0,0,0,0],[0,0,0,0,1,1],[0,0,0,2,0,0],[1,0,1,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]}]');
			var popup = $('<div class="popup"></div>');
			var popupContainer = $('<div class=popupContainer></div>').append(popup);
			$('body').append($('<div class="popupOverlay">'));
			$('body').append(popupContainer);
			var popupDiv = _.template($('#LoadPopupTemplate').html())();
			popup.append(popupDiv);
		});
		$('body').on('click', '.loadDiv button', function() {
			var str = $(this).parent().find('input').val();
			console.log(str);
			col.load(str);
			closePopup();
			return false;
		});
		$('body').on('click', '.popupContainer', function() {
			closePopup();
		});
		$('body').on('click', '.popup', function() {
			return false;
		})
		$('body').on('click', '.loadDiv a', function() {
			$('.loadDiv').find('input').val($(this).attr('data'));
		});
		$('.saveBtn').click(function() {
			var str = col.save('update');
			var popup = $('<div class="popup"></div>');
			var popupContainer = $('<div class=popupContainer></div>').append(popup);
			$('body').append($('<div class="popupOverlay">'));
			$('body').append(popupContainer);
			str = str.replace()
			var popupDiv = _.template($('#SavePopupTemplate').html())({ data: str });
			popup.append(popupDiv);
		});

		function closePopup() {
			$('.popupOverlay').remove();
			$('.popupContainer').remove();
		}
	});
})();
