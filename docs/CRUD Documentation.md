# API Documentation for CRUD Operations

## General JSON Structure
Each payload follows a common structure:
- **command**: The operation type. Always set to `"retool_backend_go/db.crud.direct"`.
- **batch**: Contains the editor credentials and the operations list.
  - **editor**: Contains the `user_id` and `access_key` for authentication.
  - **operations**: A list of operations (`create`, `select`, `update`, `delete`) performed on specific tables.
  
---

## 1. Example Create Operation

This batch creates records in the `socials`, `profileTypes`, and `countries` tables. The **`dry_run`** flag is set to `true` to simulate the creation without actual execution.

```json
{
  "command": "retool_backend_go/db.crud.direct",
  "user": {
    "user_id": "test@thegid.id",
    "access_key": "test-access-key"
  },
  "batch": {
    "dry_run": true,
    "operations": [
      {
        "table_name": "socials",
        "db_name": "A",
        "create": {
          "list_of_values": [
            {
              "name": "Facebook",
              "socialTypeId": 1,
              "url": "https://facebook.com/exampleprofile",
              "profileId": 1234
            },
            {
              "name": "LinkedIn",
              "socialTypeId": 2,
              "url": "https://linkedin.com/exampleprofile",
              "profileId": 1234
            }
          ]
        }
      },
      {
        "table_name": "profileTypes",
        "db_name": "A",
        "create": {
          "list_of_values": [
            {
              "name": "Influencer",
              "definition": "A person with significant influence on social media"
            },
            {
              "name": "Blogger",
              "definition": "A person who writes articles regularly"
            }
          ]
        }
      },
      {
        "table_name": "countries",
        "db_name": "A",
        "create": {
          "list_of_values": [
            {
              "name": "France",
              "code": "FR"
            },
            {
              "name": "Germany",
              "code": "DE"
            }
          ]
        }
      }
    ]
  }
}
```

---

## 2. Example Update Operation


```json
{
  "command": "retool_backend_go/db.crud.direct",
  "user": {
    "user_id": "test@thegid.id",
    "access_key": "test-access-key"
  },
  "batch": {
    "dry_run": true,
    "operations": [
      {
        "table_name": "socials",
        "db_name": "A",
        "update": {
          "record_id_to_values": {
            "1827": {
              "url": "https://facebook.com/newprofileurl"
            },
            "1828": {
              "url": "https://linkedin.com/newprofileurl"
            }
          }
        }
      },
      {
        "table_name": "profileTypes",
        "db_name": "A",
        "update": {
          "record_id_to_values": {
            "4618": {
              "definition": "An expert with influence on social media"
            },
            "4619": {
              "definition": "A regular content creator on various platforms"
            }
          }
        }
      },
      {
        "table_name": "countries",
        "db_name": "A",
        "update": {
          "record_id_to_values": {
            "4351": {
              "code": "FR2"
            },
            "4352": {
              "code": "DE2"
            }
          }
        }
      }
    ]
  }
}
```

---

## 3. Example Select Operation

Select only supports selections of records by ID, and select all in batches.

```json
{
  "command": "retool_backend_go/db.crud.direct",
  "user": {
    "user_id": "test@thegid.id",
    "access_key": "test-access-key"
  },
  "batch": {
    "dry_run": true,
    "operations": [
      {
        "table_name": "socials",
        "db_name": "A",
        "select": {
          "record_ids_to_select_list": [ // specify the exact ids we want to select
            "1827",
            "1828"
          ]
        }
      },
      {
        "table_name": "profileTypes",
        "db_name": "A",
        "select": {
          // "record_ids_to_select_list" is null, so we select all records
          "batch_offset": 0, // when select all, specify batch offset
          "batch_size": 1000 // and batch size
        }
      },
      {
        "table_name": "countries",
        "db_name": "A",
        "select": {
          // "record_ids_to_select_list" is null, so we select all records
          "batch_offset": 100, // when select all, specify batch offset
          "batch_size":   100  // and batch size
        }
      }
    ]
  }
}
```

---

## 4. Example Delete Operation


```json
{
  "command": "retool_backend_go/db.crud.direct",
  "user": {
    "user_id": "test@thegid.id",
    "access_key": "test-access-key"
  },
  "batch": {
    "dry_run": true,
    "operations": [
      {
        "table_name": "socials",
        "db_name": "A",
        "delete": {
          "record_ids_to_delete_list": [
            "1827",
            "1828"
          ]
        }
      },
      {
        "table_name": "profileTypes",
        "db_name": "A",
        "delete": {
          "record_ids_to_delete_list": [
            "4618",
            "4619"
          ]
        }
      },
      {
        "table_name": "countries",
        "db_name": "A",
        "delete": {
          "record_ids_to_delete_list": [
            "4351",
            "4352"
          ]
        }
      }
    ]
  }
}
```

## 4. Example Copy Operation

This batch copies records to `profileInfos` table. The **`dry_run`** flag is set to `true` to simulate the creation without actual execution.

```json
{
  "command": "retool_backend_go/db.crud.direct",
  "user": {
    "user_id": "test@thegid.id",
    "access_key": "test-access-key"
  },
  "batch": {
    "dry_run": true,
    "transactions": [
      {
        "operation_type": "copy",
        "from": "script",
        "source": {
          "table_name": "profiles",
          "db_name": "A",
          "record_id": "1",
          "column_name": "name"
        },
        "destination": {
          "table_name": "profileInfos",
          "db_name": "A",
          "record_id": "65",
          "column_name": "name"
        }
      }
    ]
  }
}

```

---

## Using `dry_run` Flag
In all the above examples, the **`dry_run`** flag is set to `true`. This flag is used to simulate the CRUD operations without actually performing them on the database. If you want to execute these operations for real, simply set `"dry_run": false`.

```json
"dry_run": true // Set to false to perform actual operations
```

---


## Python client call example

```python 
import requests
import json

# Define the API endpoint
ENDPOINT = "https://a2f6zzrqop62jwep7ehq53nn2m0rkwqq.lambda-url.eu-central-1.on.aws"

# Define headers (if needed)
headers = {
    'Content-Type': 'application/json'
}

# Authentication details (editor credentials)
editor_credentials = {
    "user_id": "test@thegid.id",
    "access_key": "test-access-key"
}

# Function to make the API call
def make_api_call(data):
    response = requests.post(ENDPOINT, headers=headers, data=json.dumps(data))
    return response.json()

# Example create operation
def create_records():
    create_payload = {
        "command": "retool_backend_go/db.crud.direct",
        "user": editor_credentials,
        "batch": {        
            "dry_run": true,
            "operations": [
                {
                    "table_name": "socials",
                    "db_name": "A",
                    "create": {
                        "list_of_values": [
                            {
                                "name": "Instagram",
                                "socialTypeId": 3,
                                "url": "https://instagram.com/exampleprofile",
                                "profileId": 5678
                            }
                        ]
                    }
                }
            ]
        }
    }

    response = make_api_call(create_payload)
    print("Create Response:", response)

# Example update operation
def update_records():
    update_payload = {
        "command": "retool_backend_go/db.crud.direct",
        "user": editor_credentials,
        "batch": {
            "dry_run": true,
            "operations": [
                {
                    "table_name": "socials",
                    "db_name": "A",
                    "update": {
                        "record_id_to_values": {
                            "5678": {
                                "url": "https://instagram.com/updatedprofileurl"
                            }
                        }
                    }
                }
            ]
        }
    }

    response = make_api_call(update_payload)
    print("Update Response:", response)

# Example delete operation
def delete_records():
    delete_payload = {
        "command": "retool_backend_go/db.crud.direct",
        "user": editor_credentials,
        "batch": {
            "operations": [
                {
                    "dry_run": False,  # Set to False to perform actual operation
                    "table_name": "socials",
                    "db_name": "A",
                    "delete": {
                        "record_ids_to_delete_list": [
                            "5678"
                        ]
                    }
                }
            ]
        }
    }

    response = make_api_call(delete_payload)
    print("Delete Response:", response)

# Example copy operation
def copy_records():
    copy_payload = {
        "command": "retool_backend_go/db.crud.direct",
        "user": editor_credentials,
        "batch": {
            "dry_run": true,
            "transactions": [
                {
                    "operation_type": "copy",
                    "from": "migration_script",
                    "source": {
                        "table_name": "profiles",
                        "db_name": "A",
                        "record_id": "1",
                        "column_name": "name"
                    },
                    "destination": {
                        "table_name": "profileInfos",
                        "db_name": "A",
                        "record_id": "65",
                        "column_name": "name"
                    }
                }
            ]
        }
    }

    response = make_api_call(copy_payload)
    print("Copy Response:", response)

# Run the operations
if __name__ == "__main__":
    create_records()
    update_records()
    delete_records()
    copy_records()

```
