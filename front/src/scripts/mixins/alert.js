define([], function() {
    var Alertjs = (function(ajs) {    
        "use strict";
        
        // *************************************** //
        // ***** PRIVATE METHODS & VARIABLES ***** //
        // *************************************** //
       
        var underlay,
            modal,
            yesEl,
            noEl,
            title,
            message,
            yes,
            no;
    
        function _createModal() {
            modal = document.createElement('DIV');
            modal.id = 'alert-modal'; 
            modal.innerHTML = '<h1 class="alert-title">' + title + '</h1>' +
                '<p class="alert-message">' + message + '</p>' +
                '<p id="alert-yes">' + yes + '</p>' + no;
            
            document.body.appendChild(modal);
        }
    
        function _destroyModal() {
            document.body.removeChild(modal);
        }
    
        function _createUnderlay() {
            underlay = document.createElement('DIV');
            underlay.id = 'alert-underlay';
            document.body.appendChild(underlay); 
        }
    
        function _destroyUnderlay() {
            document.body.removeChild(underlay); 
        }
    
        function _setModalParams(options) {
            options = options || {};
            
            // Set defaults
            //   - title   = 'Are you sure?'
            //   - messege = ''
            //   - yes     = 'Yes'
            //   - no      = 'No'
            
            title = options.title || 'Are you sure?';
            message = options.message || '';
            yes = options.no === false ? options.yes || 'Ok' : options.yes || 'Yes';
            no = options.no === false ? false : options.no || 'No';
    
            // If no is set to false then yes will just be a confirm
            // and there will be no 'no' button present
            no = no ? '<p id="alert-no">' + no + '</p>' : '';
        }
    
        function _setDOM() {
            _createModal();
            _createUnderlay();
        }
        
        // Clean up elements that do not get 
        // caught by garbage collection
        function _removeVariables() {
            underlay = null;
            modal = null;
            yesEl = null;
            noEl = null;
        }
    
        function _start(options) {
            _setModalParams(options);
            _setDOM();
            return new Promise(function(resolve, reject) {
                
    
                function _yesClicked() {
                    _cleanUp();
                    resolve();
                }    
        
                function _noClicked() {
                    _cleanUp();
                    reject();
                }
    
                function _removeListeners() {
                    yesEl.removeEventListener(_yesClicked);
                    if (noEl) {
                        noEl.removeEventListener(_noClicked); 
                    }
                }
    
                function _cleanUp() {
                    _removeListeners();
                    _destroyModal();
                    _destroyUnderlay();   
                    _removeVariables();
                }
     
                function _addListeners() {
                    yesEl = document.getElementById('alert-yes');
                    noEl = document.getElementById('alert-no');
                    
                    yesEl.addEventListener('click', _yesClicked);
                    
                    if (noEl) {
                        noEl.addEventListener('click', _noClicked);
                    }
                }
    
                _addListeners();
            });
        }
    
        // *************************** //
        // ***** PUBLIC METHODS ***** //
        // *************************** //
        ajs.createAlert = function(options) {
            if (document.getElementById('alert-modal') === null) {
                return _start(options);
            } else {
                return;
            }
        };
    
        return ajs;
    }(Alertjs || {}));

    return Alertjs;
});
