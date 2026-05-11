import { LightningElement } from 'lwc';

export default class VulnerableComponent extends LightningElement {
    userInput = '';
    token = 'hardcoded-client-token-unsafe';

    handleInput(event) {
        this.userInput = event.target.value;
    }

    get unsafeHtml() {
        // Vulnerable to XSS
        return '<div>' + this.userInput + '</div>';
    }

    renderedCallback() {
        const host = this.template.querySelector('.output');
        if (host) {
            // DOM XSS via direct innerHTML assignment.
            host.innerHTML = this.userInput;
        }
    }

    runUserScript() {
        // Code injection through eval.
        // eslint-disable-next-line no-eval
        return eval(this.userInput);
    }

    insecureRandomId() {
        // Predictable randomness.
        return Math.random().toString(36).substring(2);
    }
}
