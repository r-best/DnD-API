# Routes
>* [`/api/campaigns`](#apicampaigns)
>   * [`GET`](#get)
>* [`/api/campaigns/:campaign`](#apicampaignscampaign)
>   * [`GET`](#get-1)
>   * [`PUT`](#put)
>   * [`DELETE`](#delete)
>* [`/api/campaigns/:campaign/players`](#apicampaignscampaignplayers)
>   * [`GET`](#get-2)
>* [`/api/campaigns/:campaign/players/:player`](#apicampaignscampaignplayersplayer)
>   * [`GET`](#get-3)
>   * [`PUT`](#put-1)
>   * [`DELETE`](#delete-1)
>* [`/api/campaigns/:campaign/players/:player/level`](#apicampaignscampaignplayersplayerlevel)
>   * [`GET`](#get-4)
>   * [`PUT`](#put-2)
>   * [`DELETE`](#delete-2)
>* [`/api/campaigns/:campaign/players/:player/abilities`](#apicampaignscampaignplayersplayerabilities)
>   * [`GET`](#get-4)
>   * [`PUT`](#put-2)
>   * [`DELETE`](#delete-2)
>* [`/api/campaigns/:campaign/players/:player/items`](#apicampaignscampaignplayersplayeritems)
>   * [`GET`](#get-4)
>* [`/api/campaigns/:campaign/players/:player/items/:item`](#apicampaignscampaignplayersplayeritemsitem)
>   * [`GET`](#get-4)
>   * [`PUT`](#put-2)
>   * [`DELETE`](#delete-2)
>* [`/api/campaigns/:campaign/players/:player/spells`](#apicampaignscampaignplayersplayerspells)
>   * [`GET`](#get-4)
>   * [`PUT`](#put-1)
>   * [`DELETE`](#delete-1)
>* [`/api/spells`](#apispells)
>   * [`GET`](#get-4)
>* [`/api/spells/schools`](#apispellsschools)
>   * [`GET`](#get-5)
>* [`/api/spells/schools/:school`](#apispellsschoolsschool)
>   * [`GET`](#get-6)
>* [`/api/spells/level/:lv`](#apispellslevellv)
>   * [`GET`](#get-7)
>* [`/api/spells/:spell`](#apispellsspell)
>   * [`GET`](#get-11)
>   * [`PUT`](#put-2)
>   * [`DELETE`](#delete-2)

## `/api/campaigns`
### GET
* **Description:** Get all campaigns
  
  **Response body:**  
  ```
  [
    {
        "NAME": "Campaign 1"
    },
    {
        "NAME": "Campaign 2"
    }
  ]
  ```

## `/api/campaigns/:campaign`
### GET
* **Description:** Get one campaign by name
  
  **Response body**:  
  ```
  {
    "NAME": "Campaign 1"
  }
  ```
### PUT
* **Description:**
  
  **Response body**:  
  ```
  ```
### DELETE
* **Description:**
  
  **Response body**:  
  ```
  ```

## `/api/campaigns/:campaign/players`
### GET
* **Description:** Get all players in a campaign
  
  **Response body**:  
  ```
  [
    {
        "ID": 1,
        "NAME": "Test character 1",
        "CAMPAIGN_NAME": "Campaign 1",
        "RACE_NAME": "dragonborn",
        "ALIGNMENT": "lawful good",
        "AC": 15,
        "MAX_HP": 80,
        "SPD": 30,
        "INSP": 0,
        "STR": 12,
        "DEX": 15,
        "CON": 14,
        "INT": 12,
        "WIS": 12,
        "CHA": 18
    },
    {
        "ID": 2,
        "NAME": "Test character 2",
        "CAMPAIGN_NAME": "Campaign 1",
        "RACE_NAME": "dwarf",
        "ALIGNMENT": "lawful neutral",
        "AC": 17,
        "MAX_HP": 60,
        "SPD": 25,
        "INSP": 1,
        "STR": 12,
        "DEX": 15,
        "CON": 14,
        "INT": 12,
        "WIS": 12,
        "CHA": 18
    },
    ...
  ]
  ```

## `/api/campaigns/:campaign/players/:player`
### GET
* **Description:** Get a single player in a campaign by name
  
  **Response body**:  
  ```
  {
    "ID": 1,
    "NAME": "Test character 1",
    "CAMPAIGN_NAME": "Campaign 1",
    "RACE_NAME": "dragonborn",
    "ALIGNMENT": "lawful good",
    "AC": 15,
    "MAX_HP": 80,
    "SPD": 30,
    "INSP": 0,
    "STR": 12,
    "DEX": 15,
    "CON": 14,
    "INT": 12,
    "WIS": 12,
    "CHA": 18
  }
  ```
### PUT
* **Description:**
  
  **Response body**:  
  ```
  ```
### DELETE
* **Description:**
  
  **Response body**:  
  ```
  ```

## `/api/campaigns/:campaign/players/:player/level`
### GET
* **Description:** Get all the classes of a character and what levels they are in each
  
  **Response body**:  
  ```
  ```
### PUT
* **Description:**
  
  **Response body**:  
  ```
  ```
### DELETE
* **Description:**
  
  **Response body**:  
  ```
  ```

## `/api/campaigns/:campaign/players/:player/abilities`
### GET
* **Description:** Get all the abilities of a character
  
  **Response body**:  
  ```
  ```
### PUT
* **Description:**
  
  **Response body**:  
  ```
  ```
### DELETE
* **Description:**
  
  **Response body**:  
  ```
  ```

## `/api/campaigns/:campaign/players/:player/items`
### GET
* **Description:** Get all items owned by a character
  
  **Response body**:  
  ```
  ```

## `/api/campaigns/:campaign/players/:player/items/:item`
### GET
* **Description:** Get a specific item owned by a character
  
  **Response body**:  
  ```
  ```
### PUT
* **Description:**
  
  **Response body**:  
  ```
  ```
### DELETE
* **Description:**
  
  **Response body**:  
  ```
  ```

## `/api/campaigns/:campaign/players/:player/spells`
### GET
* **Description:** Get all spells associated with a player
  
  **Response body**:  
  ```
  ```
### PUT
* **Description:**
  
  **Response body**:  
  ```
  ```
### DELETE
* **Description:**
  
  **Response body**:  
  ```
  ```

## `/api/spells`
### GET
* **Description:** Get all spells
  
  **Response body**:  
  ```
  [
    {
      "NAME": "Blink",
      "DESCR": "spell description",
      "LV": 3,
      "RANGE": "self",
      "DURATION": "1 minute",
      "CAST_TIME": "1 action",
      "SCHOOL": "transmutation",
      "CONCENTRATION": 0
    },
    {
      "NAME": "Lightning Bolt",
      "DESCR": "spell description",
      "LV": 3,
      "RANGE": "100ft line",
      "DURATION": "instantaneous",
      "CAST_TIME": "1 action",
      "SCHOOL": "evocation",
      "CONCENTRATION": 0
    },
    ...
  ]
  ```

## `/api/spells/schools`
### GET
* **Description:** Get the list of spell schools
  
  **Response body**:
  ```
  [
    "abjuration",
    "conjuration",
    "divination",
    "enchantment",
    "evocation",
    "illusion",
    "necromancy",
    "transmutation"
  ]
  ```

## `/api/spells/schools/:school`
### GET
* **Description:** Get all the spells in a school
  
  **Response body**:
  ```
  [
    {
        "NAME": "Blink",
        "DESCR": "spell description",
        "LV": 3,
        "RANGE": "self",
        "DURATION": "1 minute",
        "CAST_TIME": "1 action",
        "SCHOOL": "transmutation",
        "CONCENTRATION": 0
    },
    {
        "NAME": "Polymorph",
        "DESCR": "spell description",
        "LV": 4,
        "RANGE": "60ft",
        "DURATION": "1 hour",
        "CAST_TIME": "1 action",
        "SCHOOL": "transmutation",
        "CONCENTRATION": 1
    },
    ...
  ]
  ```

## `/api/spells/level/:lv`
### GET
* **Description:** Get all spells of a certain level
  
  **Response body**:
  ```
  [
    {
        "NAME": "Blink",
        "DESCR": "spell description",
        "LV": 3,
        "RANGE": "self",
        "DURATION": "1 minute",
        "CAST_TIME": "1 action",
        "SCHOOL": "transmutation",
        "CONCENTRATION": 0
    },
    {
        "NAME": "Lightning Bolt",
        "DESCR": "spell description",
        "LV": 3,
        "RANGE": "100ft line",
        "DURATION": "instantaneous",
        "CAST_TIME": "1 action",
        "SCHOOL": "evocation",
        "CONCENTRATION": 0
    },
    ...
  ]
  ```

## `/api/spells/:spell`
### GET
* **Description:** Get a single spell by name
  
  **Response body**:  
  ```
  {
    "NAME": "Mage Hand",
    "DESCR": "spell description",
    "LV": 0,
    "RANGE": "30ft",
    "DURATION": "1 minute",
    "CAST_TIME": "1 action",
    "SCHOOL": "conjuration",
    "CONCENTRATION": 0
  }
  ```
### PUT
* **Description:**
  
  **Response body**:  
  ```
  ```
### DELETE
* **Description:**
  
  **Response body**:  
  ```
  ```