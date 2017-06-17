cd gh-pages/js
( echo "// AwesompleteUtil - Nico Hoogervorst - MIT license"; uglifyjs --compress --mangle --mangle-props --mangle-regex="/^_[^l][^i]|^bound|sourceId|targetId|dataField|listQuery|queryParam|awe|xhr|btnId/" --source-map awesomplete-util.min.js.map --source-map-url awesomplete-util.min.js.map -- awesomplete-util.js ) | cat > awesomplete-util.min.js
cd ../..
