cat gh-pages/js/awesomplete-util.js | \
sed 's/_CLS_NOT_FOUND/N/g 
s/_CLS_FOUND/F/g 
s/_AWE_CLOSE/C/g 
s/_AWE_LOAD/L/g 
s/_AWE_MATCH/M/g 
s/_AWE_PREPOP/P/g 
s/_AWE_SELECT/S/g 
s/_AWE/A/g 
s/_fire/f/g 
s/_matchValue/v/g 
s/_match/m/g 
s/_onKeydown/k/g 
s/_onLoad/o/g 
s/_lookup/l/g 
s/_restart/r/g 
s/_update/u/g 
s/_onInput/i/g 
s/_item/e/g 
s/_htmlEscape/h/g 
s/_copyFun/y/g 
s/_clickFun/q/g 
s/_mark/a/g 
s/_detach/d/g
s/_jsonFlatten/n/g
s/_suggestion/g/g
s/_isEmpty/p/g
s/_select/x/g
s/_ifNeedList/c/g
s/boundMatch/bm/g 
s/boundOnKeydown/bk/g 
s/boundOnInput/bi/g 
s/boundDetach/bd/g 
s/boundSelect/bs/g 
s/sourceId/s/g 
s/targetId/b/g 
s/dataField/z/g 
s/awe\([,:;)\\}\\. ]\)/w\1/g' 
