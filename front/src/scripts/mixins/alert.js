(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (this is window)
        this.Alertjs = this.alertjs = factory(this);
  }
}(function () {
    
    "use strict";

    var Alertjs = {};
    
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
        no,
        _yesClicked,
        _noClicked;

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
        _yesClicked = null;
        _noClicked = null;
        yes = null;
        no = null;
    }

    function _addListeners(yesEvent, noEvent) {
        yesEl = document.getElementById('alert-yes');
        noEl = document.getElementById('alert-no');
        
        yesEl.addEventListener('click', yesEvent);
        
        if (noEl) {
            noEl.addEventListener('click', noEvent);
        }
    }

    function _removeListeners(yesEvent, noEvent) {
        yesEl.removeEventListener('click', yesEvent);
        if (noEl) {
            noEl.removeEventListener('click', noEvent); 
        }
    }

    function _cleanUp(yesEvent, noEvent) {
        _removeListeners(yesEvent, noEvent);
        _destroyModal();
        _destroyUnderlay();   
        _removeVariables();
    }

    function _isOpen() {
        return document.getElementById('alert-modal');
    }
            
    function _start(options) {
        _setModalParams(options);
        _setDOM();
        return new Promise(function(resolve, reject) {
            _yesClicked = function() {
                _cleanUp(_yesClicked, _noClicked);
                resolve();
            };   
    
            _noClicked = function() {
                _cleanUp(_yesClicked, _noClicked);
                reject();
            };

            _addListeners(_yesClicked, _noClicked);
        });
    }

    // *************************** //
    // ***** PUBLIC METHODS ***** //
    // *************************** //
    Alertjs.createAlert = function(options) {
        if (document.getElementById('alert-modal') === null) {
            return _start(options);
        } else {
            return;
        }
    };

    Alertjs.closeAlert = function() {
        if (_isOpen()) {
            _cleanUp(_yesClicked, _noClicked);
        }     
    };

    return Alertjs;
}));
