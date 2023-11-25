'use strict';

/**
 * student controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::student.student', ({ strapi }) => ({
    // get students by college id
    async getStudentsByCollege(ctx) {
        const { collegeId, populate } = ctx.params;
      
        if (!collegeId) {
          return ctx.badRequest('College ID parameter is required');
        }
      
        try {
          // Use the populate option to fetch associated college data
          const students = await strapi.entityService.findMany('api::student.student', { 
            college_id: collegeId,
          }, { populate }, ['college']);
      
          if (!students || students.length === 0) {
            console.log('No students found.');
            return ctx.notFound('No students found');
          }
      
          console.log(`Found ${students.length} students.`);
          return students;
        } catch (error) {
          console.error('Error fetching students:', error);
          return ctx.badRequest('Error fetching students');
        }
    }
      
}));
