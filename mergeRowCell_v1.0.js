var fnMergeRowCell = function(maintbodyObj, limitRowOrRowIndexs) {
	var limitRow = null //从0~n列
	var limitRowIndex = null; //具体限制某列，如[0,4,5]

	if(limitRowOrRowIndexs == undefined || limitRowOrRowIndexs == null) {
		limitRow = null;
		limitRowIndex = null;
	} else {
		if($.isArray(limitRowOrRowIndexs)) {
			limitRowIndex = limitRowOrRowIndexs;
			limitRow = null;
		} else {
			limitRowIndex = null;
			limitRow = limitRowOrRowIndexs;
		}
	}

	/**
	 * 名称说明
	 * 1. 主合并对象：设置rowspan的td
	 * 2. 子合并对象：被隐藏的td
	 * 
	 * 实现原理
	 * 1. 每行扫描，拿当前行和下一行做对比，如果值为一致，标记为主合并对象（在标记前要判断是否为主标记对象，如果为子标记对对象进行data-ishide 标记 ），
	 * 2. 下一行自动标记上主合并对象的 data-pid
	 */

	var callAttr = "data-main";
	var dataPidKey = "data-cid";
	var $tbody = $(maintbodyObj);
	var trs = $tbody.find("tr");

	for(var i = 0; i < trs.length; i++) {
		var $cr = $(trs[i]);
		var $nr = $(trs[i + 1]);

		var $crtd = $cr.find("td"); //当前行下面的td
		var $nrtd = $nr.find("td"); //下一行下面的td

		if(limitRow == null) {
			limitRow = $crtd.length;
		}

		for(var r = 0; r < limitRow; r++) {
			if(null != limitRowIndex) {
				if(limitRowIndex.indexOf(r) == -1) {
					continue;
				}
			}

			var $crtdRow = $($crtd[r]);
			var $nrtdRow = $($nrtd[r]);

			//当前行对应的单元格的值 和 下一行对应的单元格的值相同
			if($crtdRow.html() == $nrtdRow.html()) {

				var dataId = $crtdRow.attr(dataPidKey);
				//如果为隐藏，则代表着这个已经是被合并的了，需要拿到data-pid
				if($crtdRow.attr(callAttr) != "false") {
					dataId = "coordinate_" + i + "_" + r;
					$crtdRow.attr(callAttr, "true").attr(dataPidKey, dataId); //标记主要主合并对象
				}
				$nrtdRow.attr(callAttr, "false").attr(dataPidKey, dataId);
				$nrtdRow.hide();
			}
		}
	}

	$tbody.find("[" + callAttr + "=true]").each(function(i, _d) {
		var dataPid = $(_d).attr(dataPidKey);
		$(_d).attr("rowspan", $tbody.find("[" + dataPidKey + "=" + dataPid + "]").length).addClass("center");
	});
}