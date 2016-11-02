/*eslint-env browser*/
/*global Awesomplete*/
/*exported AwesompleteUtil*/

/*
 */
var AwesompleteUtil = function() {
    //
    //
    var _AWE = 'awesomplete-',
        _AWE_LOAD = _AWE + 'loadcomplete',
        _AWE_CLOSE = _AWE + 'close',
        _AWE_MATCH = _AWE + 'match',
        _AWE_PREPOP = _AWE + 'prepop',
        _AWE_SELECT = _AWE + 'select',
        _CLS_FOUND = 'awe-found',
        _CLS_NOT_FOUND = 'awe-not-found',
        $ = Awesomplete.$;
    //
    // private functions
    //
        // Some parts are shamelessly copied from Awesomplete.js
        function _suggestion(data) {
          var lv = Array.isArray(data)
              ? { label: data[0], value: data[1] }
              : typeof data === "object" && "label" in data && "value" in data ? data : { label: data, value: data };
            return {label: lv.label || lv.value, value: lv.value};
        }
        // send events with detail property
        function _fire(target, name, detail) {
          // $.fire uses deprecated methods but other methods don't work in IE11.
          return $.fire(target, name, {detail: detail});
        }
        function _matchValue(awe, prepop) {
          var input = awe.input,
              utilprops = awe.utilprops, 
              selected = utilprops.selected,
              val = utilprops.convertInput(input.value),
              opened = awe.opened,
              result = [], 
              list = awe._list,
              suggestion, fake, rec, j;
          utilprops.prepop = false; 
          if (list) {
            for (j = 0; j < list.length; j++) {
              rec = list[j];
              suggestion = _suggestion(awe.data(rec, val));
              if (awe.maxItems === 0 && awe.filter(suggestion, val)) {
                opened = true;
              }
              fake = {input: {value: ''}};
              awe.replace.call(fake, suggestion);
              if (utilprops.convertInput(fake.input.value) === val) {
                if (selected && selected.value === suggestion.value && selected.label === suggestion.label) {
                  result = [rec];
                  break;
                }
                result.push(rec);
              }
            }
            if (utilprops.prevSelected !== result && result.length > 0) {
              if (prepop) {
                _fire(input, _AWE_PREPOP, result);
              } else if (utilprops.changed) {
                utilprops.prevSelected = result;
                input.classList.remove(_CLS_NOT_FOUND);
                input.classList.add(_CLS_FOUND);
                _fire(input, _AWE_MATCH, result);
              }
            } else if (utilprops.changed) {
              utilprops.prevSelected = null;
              input.classList.remove(_CLS_FOUND);
              // Mark as not-found if there are more items or if another field is active
              if (!opened || (input !== document.activeElement)) {
                 if (val.length > 0) {
                   input.classList.add(_CLS_NOT_FOUND);
                   _fire(input, _AWE_MATCH, null);
                 }
              } else {
                input.classList.remove(_CLS_NOT_FOUND);
              }
            }
          }
        }
        function _match(ev) {
          var awe = this;
          if ((ev.type === _AWE_CLOSE || ev.type === _AWE_LOAD || ev.type == 'blur') && ev.target === awe.input) {
            _matchValue(awe, awe.utilprops.prepop && ev.type === _AWE_LOAD);
          }
        }
        function _onKeydown(ev) {
          var awe = this;
          if (ev.target === awe.input && ev.keyCode === 9) { // TAB key
            awe.select();       // take current selected item
          }
        }
        function _select(ev) {
          var awe = this;
          awe.utilprops.changed = true;
          awe.utilprops.selected = ev.text;
        }
        function _isEmpty(val) {
          return Object.keys(val).length === 0 && val.constructor === Object
        }
        function _onLoad() {
          var t = this,
              awe = t.awe,
              xhr = t.xhr,
              queryParam = t.queryParam,
              val = awe.utilprops.val,
              data, 
              prop;
          if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            if (awe.utilprops.convertResponse) data = awe.utilprops.convertResponse(data);
            if (!Array.isArray(data)) {
              // search for the first property that contains an array
              for (prop in data) {
                if (Array.isArray(data[prop])) {
                  data = data[prop];
                  break;
                }
              }
            }
            // if we always get 0 or 1 result back
            if (!Array.isArray(data) && awe.utilprops.limit === 1) {
              data = _isEmpty(data) ? [] : [data]
            }
            // we can only handle arrays
            if (Array.isArray(data)) {
              // do we still need this search result?;
              // - There is no result 
              // or
              // - no loadall && value starts with query-param && value does not start with current result
              if (!awe.utilprops.listQuery 
                  ||
                  (!awe.utilprops.loadall && 
                   val.lastIndexOf(queryParam, 0) === 0 && 
                   (val.lastIndexOf(awe.utilprops.listQuery, 0) !== 0 || 
                     (awe.utilprops.limit > 1 && awe._list.length >= awe.utilprops.limit)))) {
                awe.list = data;
                awe.utilprops.listQuery = queryParam || awe.utilprops.loadall;
                _fire(awe.input, _AWE_LOAD, queryParam);
              }
            }
          }
        }
        function _lookup(awe, val) {
          var xhr;
          if (awe.utilprops.url) {
            // if we don't have the result already;
            // - There is no result yet, or there is a result but not for the characters we entered
            // - with loadall, the value doesn't matter.
            if (!awe.utilprops.listQuery || 
                   (!awe.utilprops.loadall && 
                   (val.lastIndexOf(awe.utilprops.listQuery, 0) !== 0 || 
                     (awe.utilprops.limit > 1 && awe._list.length >= awe.utilprops.limit)))) {
              xhr = new XMLHttpRequest();
              awe.utilprops.ajax( awe.utilprops.url, 
                                  awe.utilprops.urlEnd,
                                  awe.utilprops.loadall ? '' : val, 
                                  _onLoad.bind({awe: awe, xhr: xhr, queryParam: val}),
                                  xhr
                                );
            } else {
              _matchValue(awe, awe.utilprops.prepop);
            }
          } else {
            _matchValue(awe, awe.utilprops.prepop);
          }
        }
        function _restart(awe) {
          var elem = awe.input;
          elem.classList.remove(_CLS_FOUND);
          elem.classList.remove(_CLS_NOT_FOUND);
          _fire(elem, _AWE_MATCH, null);
        }
        function _update(awe, val, prepop) {
          awe.utilprops.prepop = prepop || false;
          if (awe.utilprops.val !== val) {
            awe.utilprops.selected = null;
            awe.utilprops.changed = true;
            awe.utilprops.val = val;
            if (val.length < awe.minChars || val.length == 0) {
              _restart(awe);
            }
            if (val.length >= awe.minChars) {
              _lookup(awe, val);
            }
          }
          return awe;
        }
        function _onInput(e) {
          var awe = this,
              val;
          if (e.target === awe.input) {
            val = awe.utilprops.convertInput(awe.input.value);
            _update(awe, val);
          }
        }
        function _item(html /* , input */) {
          return $.create('li', {
            innerHTML: html,
            'aria-selected': 'false'
          });
        }
        function _htmlEscape(text) {
          return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
        }
        function _copyFun(e) { 
          var t = this,
              sourceId  = t.sourceId,
              dataField = t.dataField,
              targetId  = t.targetId,
              elem,
              val;
          if (e.target === $(sourceId)) {
            if ('function' === typeof targetId) {
              targetId(e, dataField);
            } else {
              elem = $(targetId);
              if (elem && elem !== document.activeElement) {
                val = Array.isArray(e.detail) && e.detail.length === 1 ? e.detail[0] : null;
                val = ('undefined' !== typeof dataField && val ? val[dataField] : val) || '';
                if ('undefined' !== typeof elem.value) {
                  elem.value = val;
                } else if ('undefined' !== typeof elem.src) {
                  elem.src = val;
                } else {
                  elem.innerHTML = val;
                }
              }
            }
          }
        }
        function _clickFun(e) {
          var t = this,
              awe;
          if (e.target === $(t.btnId)) {
            awe = $(t.aweId);
            if (awe.ul.childNodes.length === 0) {
             awe.minChars = 0;
             awe.evaluate();
            } else if (awe.ul.hasAttribute('hidden')) {
             awe.open();
            } else {
             awe.close();
            }
          }
        }
        function _mark(text, input, startsWith) {
          var searchText = $.regExpEscape(_htmlEscape(input).trim()), 
              regExp = startsWith ? RegExp('^' + searchText, 'i') : RegExp('(?!<[^>]+?>)' + searchText + '(?![^<]*?>)', 'gi');
          return text.replace(regExp, '<mark>$&</mark>');
        }
        function _jsonFlatten(result, cur, prop, level, opts) {
          var root = opts.root, 
              value = opts.value, 
              label = opts.label || opts.value, 
              isEmpty = true, arrayResult = [], j;
          if (level === 0 && root && prop && (prop + '.').lastIndexOf(root + '.', 0) !== 0 && (root + '.').lastIndexOf(prop + '.', 0) !== 0) {
            return result;        
          } 
          if (Object(cur) !== cur) {
            if (prop) {
              result[prop] = cur;
            } else {
              result = cur;
            }
          } else if (Array.isArray(cur)) {
            for (j = 0; j < cur.length; j++) {
              arrayResult.push(_jsonFlatten({}, cur[j], '', level + 1, opts));
            }
            if (prop) {
              result[prop] = arrayResult;
            } else {
              result = arrayResult;
            }
          } else {
            for (j in cur) {
              isEmpty = false;
              _jsonFlatten(result, cur[j], prop ? prop + '.' + j : j, level, opts);
            }
            if (isEmpty && prop) result[prop] = {};
          }
          if (level < 2 && prop) { 
            if (value && (prop + '.').lastIndexOf(value + '.', 0) === 0) { result['value'] = result[prop]; }
            if (label && (prop + '.').lastIndexOf(label + '.', 0) === 0) { result['label'] = result[prop]; }
          }    
          return result;
        }
        function _detach() {
          var t = this,
              elem = t.awe.input,
              boundMatch = t.boundMatch,
              boundOnInput   = t.boundOnInput,
              boundOnKeydown = t.boundOnKeydown,
              boundSelect    = t.boundSelect;

          elem.removeEventListener(_AWE_SELECT, boundSelect);
          elem.removeEventListener(_AWE_LOAD,   boundMatch);
          elem.removeEventListener(_AWE_CLOSE,  boundMatch);
          elem.removeEventListener('blur',      boundMatch);
          elem.removeEventListener('input',     boundOnInput); 
          elem.removeEventListener('keydown',   boundOnKeydown);
        }

    //
    // public methods
    //
    return {
        ajax: function(url, urlEnd, val, fn, xhr) {
          xhr = xhr || new XMLHttpRequest();
          xhr.open('GET', url + encodeURIComponent(val) + (urlEnd || ''));
          xhr.onload = fn;
          xhr.send();
          return xhr;
        },
        // Convert input before comparing
        convertInput: function(text) {
          return 'string' === typeof text ? text.trim().toLowerCase() : '';
        },
        mark: _mark,
        itemContains: function(text, input) {
          var arr;
          if (input.trim() !== '') {
            arr = ('' + text).split(/<p>/);
            arr[0] = _mark(arr[0], input);
            text = arr.join('<p>');
          }
          return _item(text, input);
        },
        itemStartsWith: function(text, input) {
          return _item(input.trim() === '' ? '' + text : _mark('' + text, input, true), input);
        },
        createAwesomplete: function(elemId, utilOpts, opts) {
          opts.item = opts.item || this.itemContains;
          var awe = new Awesomplete(elemId, opts);
          awe.utilprops = utilOpts || {};
          // if there is no url and there is a static data-list, loadall is by definition true
          if (!awe.utilprops.url && 'undefined' === typeof awe.utilprops.loadall) {
            awe.utilprops.loadall = true;
          }
          awe.utilprops.ajax = awe.utilprops.ajax || this.ajax;
          awe.utilprops.convertInput = awe.utilprops.convertInput || this.convertInput;
          return awe;
        },
        attach: function(awe) {
          var elem = awe.input,
              boundMatch = _match.bind(awe),
              boundOnKeydown = _onKeydown.bind(awe),
              boundOnInput   = _onInput.bind(awe),
              boundSelect    = _select.bind(awe),
              boundDetach    = _detach.bind({awe: awe, 
                                             boundMatch:     boundMatch, 
                                             boundOnInput:   boundOnInput, 
                                             boundOnKeydown: boundOnKeydown,
                                             boundSelect:    boundSelect
                                            }),
              events = {
                'keydown': boundOnKeydown,
                'input':   boundOnInput
              };
          events['blur'] = events[_AWE_CLOSE] = events[_AWE_LOAD] = boundMatch;
          events[_AWE_SELECT] = boundSelect;
          $.bind(elem, events);

          awe.utilprops.detach = boundDetach;
          if (awe.utilprops.prepop && (awe.utilprops.loadall || elem.value !== '')) {
            awe.utilprops.val = awe.utilprops.convertInput(elem.value);
            _lookup(awe, awe.utilprops.val);
          }
          return awe;
        },
        update: function(awe, value, prepop) {
          awe.input.value = value;
          return _update(awe, value, prepop);
        },
        startAwesomplete: function(elemId, utilOpts, opts) {
          return this.attach(this.createAwesomplete(elemId, utilOpts, opts));
        },
        detach: function(awe) {
          if (awe.utilprops.detach) {
            awe.utilprops.detach();
            delete awe.utilprops.detach
          }
          return awe;
        },
        createCopyFun: function(sourceId, dataField, targetId) {
          return _copyFun.bind({sourceId: sourceId, dataField: dataField, targetId: targetId});
        },
        attachCopyFun: function(fun, prepop) {
          prepop = 'boolean' === typeof prepop ? prepop : true;
          addEventListener(_AWE_MATCH, fun);
          if (prepop) addEventListener(_AWE_PREPOP, fun);
          return fun;
        },
        startCopy: function(sourceId, dataField, targetId, prepop) {
          return this.attachCopyFun(this.createCopyFun(sourceId, dataField, targetId), prepop);
        },
        detachCopyFun: function(fun) {
          removeEventListener(_AWE_PREPOP, fun);
          removeEventListener(_AWE_MATCH, fun);
          return fun;
        },
        createClickFun: function(btnId, aweId) {
          return _clickFun.bind({btnId: btnId, aweId : aweId});
        },
        attachClickFun: function(fun) {
          addEventListener('click', fun); 
          return fun;
        },
        startClick: function(btnId, aweId) {
          return this.attachClickFun(this.createClickFun(btnId, aweId));
        },
        detachClickFun: function(fun) {
          removeEventListener('click', fun); 
          return fun;
        },
        // FILTER_CONTAINS filters on data.label. Here we filter on value and not on the shown label which contains markup.
        filterContains: function(data, input) { 
          return Awesomplete.FILTER_CONTAINS(data.value, input);
        },
        // FILTER_STARTSWITH filters on data.label. Here we filter on value and not on the shown label which contains markup.
        filterStartsWith: function(data, input) { 
          return Awesomplete.FILTER_STARTSWITH(data.value, input);
        },
        jsonFlatten: function(data) {
          return _jsonFlatten({}, data, '', 0, this);
        }
    };
}();
