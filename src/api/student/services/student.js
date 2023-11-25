'use strict';

/**
 * student service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::student.student', ({ strapi }) =>  ({
    // Method for getStudentsByCollegeId
    async getStudentsByCollegeId(collegeId, params, populate) {
        try {
        // Query students based on the college ID
        const students = await strapi.query('student').find({ college: collegeId }, params, populate);

        // Your custom logic, if any
        students.forEach(student => {
            student.customField = 'Some value';
        });

        return students;
        } catch (error) {
        console.error('Error fetching students by college ID:', error);
        }
    },
  
    // Method 2: Wrapping a core service (leaves core logic in place)
    async find(...args) {  
      // Calling the default core controller
      const { results, pagination } = await super.find(...args);
  
      results.forEach(result => {
        result.counter = 1;
      });
  
      return { results, pagination };
    },
  
    // Method 3: Replacing a core service
    async findOne(entityId, params = {}) {
      return strapi.entityService.findOne('api::student.student', entityId, this.getFetchParams(params));
    }
  }));
