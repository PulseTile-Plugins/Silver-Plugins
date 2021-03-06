/*
 ~  Copyright 2017 Ripple Foundation C.I.C. Ltd
 ~  
 ~  Licensed under the Apache License, Version 2.0 (the "License");
 ~  you may not use this file except in compliance with the License.
 ~  You may obtain a copy of the License at
 ~  
 ~    http://www.apache.org/licenses/LICENSE-2.0

 ~  Unless required by applicable law or agreed to in writing, software
 ~  distributed under the License is distributed on an "AS IS" BASIS,
 ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~  See the License for the specific language governing permissions and
 ~  limitations under the License.
 */
let _ = require('underscore');

/* istanbul ignore next  */
export function removeTags(userinput, cb){
  // Bind remove events
  $(userinput).find('a.remove').each(function(){
    // Remove binding is already assigned
    $(this).unbind('click');

    // Re-bind
    $(this).click(function(){
      var tag = $(this).closest('span');
      cb(tag.attr('data-tag-id'));

      tag.remove();
    });
  });

}

// Credit: http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
export function pasteHtmlAtCaret(html, target) {
  var parentNode = document.getElementById("clinicalNote");
  var lastChildNode = parentNode.lastChild;
  var insertNodeBlock = document.getElementById("temp");
  // SG: Switch focus to target before inserting
  target.focus();

  var sel, range;
  /* istanbul ignore if  */
  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();

    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // only relatively recently standardized and is not supported in
      // some browsers (IE9, for one)
      var el = document.createElement("div");
      el.innerHTML = html + ' ';
      var frag = document.createDocumentFragment(), node, lastNode;
      while ( (node = el.firstChild) ) {
        lastNode = frag.appendChild(node);
      }

      if (sel.focusOffset === 0 && lastChildNode) {
        range.selectNode(insertNodeBlock);
      }
      
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (document.selection && document.selection.type !== "Control") {
    // IE < 9
    document.selection.createRange().pasteHTML(html);
  }
}

export function strip(html, cb){
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;  
  var resultText = tmp.textContent||tmp.innerText;

  if (typeof cb === 'function') {
    cb(tmp.innerHTML);
  }
  
  return tmp.textContent||tmp.innerText;

}