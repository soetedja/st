app.constant("config", {
    "base_api_url": "http://mongosilakan.net/Base.RestAPI/"
    //"base_api_url": "http://localhost/bitbucket/base-framework/Base.RestAPI/"
});

app.constant("constants", {
    "modules": {
        resources: {
            resource: {
                api: "api/resource/"
            }
        },
        saleStock: {
            product: {
                api: "api/product/"
            }
        }
    },
    "message_type": {
        success: 'success',
        warning: 'warning',
        error: 'error',
        info: 'info'
    },
    "status": {
        active: '1',
        inactive: '2',
        pending: '3',
        review: '4'
    }
});