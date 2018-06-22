const uuidv1 = require('uuid/v1');

const elastic = require('./elastic');

const csv = require('csvtojson');

elastic.client.indices
    .delete({
        index: 'genderpaygap'
    })
    .then(() => console.log('=== Index deleted'))
    .catch(() => true)
    // .then(() => elastic.client.indices.create({
    //     index: 'genderpaygap',
    //     body: {
    //         mappings: {
    //             '2017-2018': {
    //                 properties: {
    //                     companyNumber: { type: 'integer' },
    //                     sicCodes: { type: 'integer' },
    //                     diffMeanHourlyPercent: { type: 'float' },
    //                     diffMedianHourlyPercent: { type: 'float' },
    //                     diffMeanBonusPercent: { type: 'float' },
    //                     diffMedianBonusPercent: { type: 'float' },
    //                     maleBonusPercent: { type: 'float' },
    //                     femaleBonusPercent: { type: 'float' },
    //                     maleLowerQuartile: { type: 'float' },
    //                     femaleLowerQuartile: { type: 'float' },
    //                     maleLowerMiddleQuartile: { type: 'float' },
    //                     femaleLowerMiddleQuartile: { type: 'float' },
    //                     maleUpperMiddleQuartile: { type: 'float' },
    //                     femaleUpperMiddleQuartile: { type: 'float' },
    //                     maleTopQuartile: { type: 'float' },
    //                     femaleTopQuartile: { type: 'float' }
    //                 }
    //             }
    //         }
    //     }
    // }))
    // .then(() => console.log('=== Mappings created'))
    .then(() => csv({ checkType: true })
        .fromFile('gov-uk-data-2017-2018.csv')
        .then((json) => {
            let data = [];
            json.forEach((item) => {
                data.push({
                    index: {
                        _index: 'genderpaygap', _type: '2017-2018', _id: uuidv1()
                    }
                });
                data.push({
                    employerName: item.EmployerName,
                    address: item.Address,
                    companyNumber: item.CompanyNumber,
                    sicCodes: item.SicCodes,
                    diffMeanHourlyPercent: item.DiffMeanHourlyPercent,
                    diffMedianHourlyPercent: item.DiffMedianHourlyPercent,
                    diffMeanBonusPercent: item.DiffMeanBonusPercent,
                    diffMedianBonusPercent: item.DiffMedianBonusPercent,
                    maleBonusPercent: item.MaleBonusPercent,
                    femaleBonusPercent: item.FemaleBonusPercent,
                    maleLowerQuartile: item.MaleLowerQuartile,
                    femaleLowerQuartile: item.FemaleLowerQuartile,
                    maleLowerMiddleQuartile: item.MaleLowerMiddleQuartile,
                    femaleLowerMiddleQuartile: item.FemaleLowerMiddleQuartile,
                    maleUpperMiddleQuartile: item.MaleUpperMiddleQuartile,
                    femaleUpperMiddleQuartile: item.FemaleUpperMiddleQuartile,
                    maleTopQuartile: item.MaleTopQuartile,
                    femaleTopQuartile: item.FemaleTopQuartile,
                    companyLinkToGPGInfo: item.CompanyLinkToGPGInfo,
                    responsiblePerson: item.ResponsiblePerson,
                    employerSize: item.EmployerSize,
                    currentName: item.CurrentName,
                    submittedAfterTheDeadline: item.SubmittedAfterTheDeadline
                });
            });

            return elastic.client.bulk({
                body: data
            });
        })
        .then(() => console.log('=== Complete'))
        .catch((error) => console.log(error))
        .finally(() => elastic.client.close())
    );
