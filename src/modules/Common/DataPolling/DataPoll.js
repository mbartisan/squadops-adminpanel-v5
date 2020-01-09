export class StandardBackgroundAPIDataPoll {
    constructor(func, activeInterval, inactiveInterval, timeout) {
        this._windowBecomesActiveFunc = this._windowBecomesActiveFunc.bind(this);
        this._windowBecomesInactiveFunc = this._windowBecomesInactiveFunc.bind(this);

        this.func = () => {
            console.log("Running DataPoll");
            func();
        };

        this.activeInterval = activeInterval;
        this.inactiveInterval = inactiveInterval;

        this.timeoutId = null;
        this.timeoutTime = timeout + 1; // +1 to run the last interval before we clear

        this.isActive = true;

        window.addEventListener('focus', this._windowBecomesActiveFunc);
        window.addEventListener('blur', this._windowBecomesInactiveFunc);
    }

    startActiveInterval() {
        if (this.activeIntervalId) clearInterval(this.activeIntervalId);
        this.activeIntervalId = setInterval(this.func, this.activeInterval);
    }

    stopActiveInterval() {
        clearInterval(this.activeIntervalId);
        this.activeIntervalId = null;
    }

    startInactiveInterval() {
        if (this.inactiveIntervalId) clearInterval(this.inactiveIntervalId);
        this.inactiveIntervalId = setInterval(this.func, this.inactiveInterval);
        this.timeoutId = setTimeout(()=>this.stopInactiveInterval(), this.timeoutTime);
    }

    stopInactiveInterval() {
        clearInterval(this.inactiveIntervalId);
        this.inactiveIntervalId = null;
        if (this.timeoutId) clearTimeout(this.timeoutId);
    }

    _windowBecomesActiveFunc() {
        this.func();
        this.stopInactiveInterval();
        this.startActiveInterval();
        this.isActive = true;
    }

    _windowBecomesInactiveFunc() {
        this.stopActiveInterval();
        this.startInactiveInterval();
        this.isActive = false;
    }

    clear() {
        window.removeEventListener('focus', this._windowBecomesActiveFunc);
        window.removeEventListener('blur', this._windowBecomesInactiveFunc);
        this.stopActiveInterval();
        this.stopInactiveInterval();
    }
}
