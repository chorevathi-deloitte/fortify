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

    criticalXssVulnerability() {
        // Direct DOM XSS — this is highest confidence
        const inputData = this.userInput;
        const maliciousHtml = `<img src=x onerror="alert('${inputData}')">`;
        this.innerHTML = maliciousHtml;
    }

    sqlInjectionStyle() {
        // Simulated SQL injection pattern
        const userId = this.userInput;
        const query = "SELECT * FROM users WHERE id = '" + userId + "'";
        return query;
    }

    pathTraversalRisk() {
        // Path traversal pattern
        const filePath = '/uploads/' + this.userInput;
        return filePath;
    }

    commandInjectionRisk() {
        // Command injection style
        const cmd = 'echo ' + this.userInput;
        return cmd;
    }

    multipleHardcodedSecrets() {
        // Multiple hardcoded credentials/secrets
        const apiKey1 = 'sk-1234567890abcdefghij';
        const apiKey2 = 'api_key_super_secret_12345';
        const password = 'Admin@123';
        const dbPassword = 'root_password_here';
        const tokenSecret = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
        return { apiKey1, apiKey2, password, dbPassword, tokenSecret };
    }

    multipleInnerHtmlAssignments() {
        // Multiple innerHTML assignments with untrusted data
        const elem1 = document.getElementById('output1');
        const elem2 = document.getElementById('output2');
        const elem3 = document.getElementById('output3');
        
        if (elem1) elem1.innerHTML = this.userInput;
        if (elem2) elem2.innerHTML = '<div>' + this.userInput + '</div>';
        if (elem3) elem3.innerHTML = `<p>${this.userInput}</p>`;
    }

    multipleEvalCalls() {
        // Multiple eval() calls in different contexts
        eval(this.userInput);
        const result1 = eval('var x = ' + this.userInput);
        const result2 = eval(`const y = ${this.userInput}`);
        setTimeout(eval(this.userInput), 1000);
        return result1;
    }

    multipleSqlInjectionPatterns() {
        // Multiple SQL injection patterns
        const userId = this.userInput;
        const email = this.userInput;
        const name = this.userInput;
        
        const query1 = "SELECT * FROM users WHERE id = '" + userId + "'";
        const query2 = "SELECT * FROM accounts WHERE email = '" + email + "' OR '1'='1'";
        const query3 = "DELETE FROM users WHERE name LIKE '%" + name + "%'";
        const query4 = "INSERT INTO logs (user) VALUES ('" + userId + "')";
        
        return [query1, query2, query3, query4];
    }

    multiplePathTraversalPatterns() {
        // Multiple path traversal patterns
        const path1 = '/uploads/' + this.userInput;
        const path2 = '/files/' + this.userInput + '/download';
        const path3 = '/home/user/' + this.userInput;
        const path4 = '../../../' + this.userInput;
        
        return [path1, path2, path3, path4];
    }

    multipleCommandInjectionPatterns() {
        // Multiple command injection patterns
        const cmd1 = 'ls ' + this.userInput;
        const cmd2 = 'cat /etc/passwd && ' + this.userInput;
        const cmd3 = `curl http://example.com/${this.userInput}`;
        const cmd4 = 'exec ' + this.userInput;
        
        return [cmd1, cmd2, cmd3, cmd4];
    }

    xssViaFunctionCall() {
        // XSS via function that takes HTML
        const maliciousContent = '<script>alert(' + this.userInput + ')</script>';
        this.setInnerContent(maliciousContent);
    }

    setInnerContent(html) {
        const container = document.getElementById('container');
        if (container) {
            container.innerHTML = html;  // Tainted data reaches innerHTML
        }
    }

    xssViaDataAttribute() {
        // XSS via data attributes
        const elem = document.createElement('div');
        elem.setAttribute('data-value', this.userInput);
        elem.innerHTML = `Data: ${elem.getAttribute('data-value')}`;
        return elem;
    }

    insecureRegex() {
        // Regex injection
        const pattern = new RegExp(this.userInput);
        return pattern.test('somestring');
    }

    insecureJSONParse() {
        // Unsafe JSON parsing with untrusted data
        return JSON.parse(this.userInput);
    }

    documentWriteVulnerability() {
        // Direct document.write with user input
        document.write('<div>' + this.userInput + '</div>');
    }

    iframeSourceInjection() {
        // iframe source injection
        const iframe = document.createElement('iframe');
        iframe.src = this.userInput;
        document.body.appendChild(iframe);
    }

    setLocationHref() {
        // Open redirect via location.href
        window.location.href = this.userInput;
    }

    insertAdjacentHtmlVulnerability() {
        // insertAdjacentHTML with untrusted data
        const elem = document.getElementById('target');
        if (elem) {
            elem.insertAdjacentHTML('beforeend', this.userInput);
        }
    }

    multipleHardcodedUrlSecrets() {
        // Hardcoded secrets in URLs
        const url1 = 'https://user:password123@api.example.com';
        const url2 = 'postgres://admin:secretpass@localhost:5432/db';
        const url3 = 'mongodb+srv://root:MyPassword123@cluster.mongodb.net';
        return [url1, url2, url3];
    }

    unsafeLocalStorageUsage() {
        // Storing sensitive data in localStorage
        localStorage.setItem('apiKey', 'sk-1234567890');
        localStorage.setItem('userPassword', this.userInput);
        localStorage.setItem('sessionToken', 'token123456789');
    }

    unsafeSessionStorageUsage() {
        // Storing sensitive data in sessionStorage
        sessionStorage.setItem('authToken', 'Bearer token123');
        sessionStorage.setItem('userCredentials', this.userInput);
    }
}
