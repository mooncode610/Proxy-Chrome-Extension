chrome.windows.onCreated.addListener(function() {
    setProxy()
});
chrome.tabs.onCreated.addListener(
    () => {
        function callbackFn(details, asyncCallback) {
            asyncCallback({
				authCredentials: { username: 'si_moon', password: 'hello277#$' }
			});
            // return {
            //     authCredentials: {
            //         username: "si_moon",
            //         password: "hello277#$"
            //     }
            // };
        }
        chrome.webRequest.onAuthRequired.addListener(callbackFn,
            { urls: ["<all_urls>"] },
            ["asyncBlocking"]
        );
        // chrome.webRequest.onAuthRequired.addListener(
        //             callbackFn,
        //             {urls: ["<all_urls>"]},
        //             ['blocking']
        // );
        // setProxy()
    }
);

const setProxy = () => {
    // var config = {
    //     mode: "fixed_servers",
    //     rules: {
    //       singleProxy: {
    //         scheme: "http",
    //         host: "45.138.25.178",
    //         port: 443
    //       },
    //       bypassList: ["foobar.com"]
    //     }
    //   };

    var config = {
        mode: "pac_script",
        pacScript: {
            data: `
            const blackList = [
                "skype.com",
                "slack.com",
                "gmail.com",
                'mail.google.com',
                'slack-edge.com',
                'apps.skypeassets.com',
                'secure.skypeassets.com',
                'slackb.com',
                'slack-imgs.com',
                'slack-files',
                'slack-files2',
                'stripe.com',
                'lambdatest.com',
                'www.ipaddress.my',
            ]
            function FindProxyForURL(url, host) {
                for(item of blackList){
                    if(host.includes(item))
                        return "PROXY 45.138.25.178:443";
                }
            }
                `,
            mandatory: false
        }
    };
      chrome.proxy.settings.set(
          {value: config, scope: 'regular'},
          function() {
              chrome.proxy.settings.get({}, function(config) {
                  console.log(config.value, config.value.host);
              }); 
          });
}