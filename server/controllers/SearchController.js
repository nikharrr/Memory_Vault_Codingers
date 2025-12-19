const SearchService = require('../services/SearchService');
const asyncHandler = require('../utils/asyncHandler');

class SearchController {
    static getConfigs = asyncHandler(async (req,res) => {
        // This looks like what was 'tagsName' and 'peopleName' before
        // But route structure was /:patient_id/tagsName
    });

    static getTags = asyncHandler(async (req,res) => {
        const { patient_id } = req.params;
        const names = await SearchService.getTags(patient_id);
        res.json(names);
    });

    static getPeople = asyncHandler(async (req,res) => {
        const { patient_id } = req.params;
        const names = await SearchService.getPeople(patient_id);
        res.json(names);
    });

    static search = asyncHandler(async (req,res) => {
        const { patient_id } = req.params;
        const { tags,people } = req.query;

        // Parse commas if strictly needed (original code did split(','))
        const tagList = tags ? tags.split(',') : [];
        const peopleList = people ? people.split(',') : [];

        const results = await SearchService.searchMemories(patient_id,tagList,peopleList);
        res.json(results);
    });
}

module.exports = SearchController;
