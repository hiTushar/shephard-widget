### GET /assets  _(for overview page)_ 
Returns all platform data  
```
    {
        data: [
            {
                platform_id: 'linux',
                platform_name: 'Linux',
                platform_assets: {
                    'new_alerts': 10,
                    'aged_alerts': 20,
                    'no_alerts': 30 
                }
            },
            ...
        ]
    }
```
<hr /> 

### GET /assets/:platformId/:alertType?page=m&limit=n _(for platform and group level page)_ 

Returns asset count data for an 'alertType' for every group name 
```
    {
        data: [
            {
                group_uuid: "",
                group_name: "",
                group_type: "",
                asset_count: ""
            },
            ...
        ],
        meta: {
            "currentPage": 2,
            "itemsPerPage": 10,
            "totalItems": 100,
            "totalPages": 10
        }
    }
``` 
<hr/>

### GET /assets/:platformId/:alertType/:groupId?page=m&limit=n   _(for asset level page)_
Return all assets from the group with alerts of 'alertType' on a platform
```
    {
        data: [
            {
                "machine_name": "",
                "machine_uuid": "",
                "group_name": "",
                "group_uuid": "",
                "group_type": "user"
            }, 
            ....
        ],
        meta: {
            "currentPage": 2,
            "itemsPerPage": 10,
            "totalItems": 100,
            "totalPages": 10
        }
    }


