# Gender Pay Gap Data Gov UK

Load the **Gender Pay Gap** data from https://gender-pay-gap.service.gov.uk CSV into ElasticSearch, then use Kibana to view and play with data or create your own search queries and aggregations.

For example ElasticSearch `stats aggregation` https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-stats-aggregation.html and graphs in Kibana https://www.elastic.co/products/kibana

## Quickstart

- Install `node`
- Install `elasticsearch` *(open source version)*
- *[OPTIONAL] Download `kibana` (open source version)*
- Clone this repo `git clone git@github.com:eddiejaoude/gender-pay-gap-gov-uk-importer.git`
- Install dependencies `npm install`
- Import CSV data to ElasticSearch `node index.js`
- *[OPTIONAL] Run `kibana` (optional)*

ElasticSearch will be running on `localhost:9200` and if using Kibana IT will be running on `localhost:5601`


## Example listing from ElasticSeach

```json
{
    "took": 0,
    "timed_out": false,
    "_shards": {
        "total": 5,
        "successful": 5,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": 10517,
        "max_score": 1,
        "hits": [
            {
                "_index": "genderpaygap",
                "_type": "2017-2018",
                "_id": "06e59cd5-75e2-11e8-97af-897373a0aed1",
                "_score": 1,
                "_source": {
                "employerName": "1879 EVENTS MANAGEMENT LIMITED",
                "address": "The Sunderland Stadium Of Light,,\r\nSunderland,\r\nTyne And Wear,\r\nSR5 1SU",
                "companyNumber": 7743495,
                "sicCodes": "56210,\r\n70229",
                "diffMeanHourlyPercent": 13.4,
                "diffMedianHourlyPercent": 8.1,
                "diffMeanBonusPercent": 41.4,
                "diffMedianBonusPercent": 43.7,
                "maleBonusPercent": 8.7,
                "femaleBonusPercent": 3.2,
                "maleLowerQuartile": 29.1,
                "femaleLowerQuartile": 70.9,
                "maleLowerMiddleQuartile": 49.4,
                "femaleLowerMiddleQuartile": 50.6,
                "maleUpperMiddleQuartile": 22.8,
                "femaleUpperMiddleQuartile": 77.2,
                "maleTopQuartile": 58.2,
                "femaleTopQuartile": 41.8,
                "companyLinkToGPGInfo": "https://www.safc.com/news/club-news/2018/march/gender-pay-gap-reporting",
                "responsiblePerson": "Jo Graham (Deputy HR Manager)",
                "employerSize": "250 to 499",
                "currentName": "1879 EVENTS MANAGEMENT LIMITED",
                "submittedAfterTheDeadline": false
            },

            // ...

        ]
    }
}
```


## Example graphs from Kibana

![Example](https://user-images.githubusercontent.com/624760/41760410-3777c1bc-75eb-11e8-9239-828812848d25.jpg)
