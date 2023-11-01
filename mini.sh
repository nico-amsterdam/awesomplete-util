cd js
../node_modules/terser/bin/terser --compress --mangle --mangle-props "regex='/^_[^l][^i]|^bound|sourceId|targetId|dataField|listQuery|queryParam|awe|xhr|btnId/'" --output awesomplete-util.min.js --source-map "url='awesomplete-util.min.js.map'" -- awesomplete-util.js
sed -i '1 i\// AwesompleteUtil - Nico Hoogervorst - MIT license' awesomplete-util.min.js
cd ..
