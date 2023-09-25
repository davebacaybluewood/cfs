
## Sprint Activities 

- 5days
- Sprint starts on Monday 
- Sprint Review/Demo after sprint (with client and agents)
- Daily Stand Up (with client)
- Daily Sync Meeting (Tech Team only)
- User Story Refinement 
- Sprint Planning 
- Handoff

## User Story and Bug Tasking 
For user story and bugs, set the following properties: 

- Original Estimate (value in hour)     
     If user story is point is 0.5 = 3 (hrs), 1 = 6.5, 2 = 13, 3 = 19.5, 5 = 32.5, 8 = 65 
- Remaining (value in hour) – Estimated time needed to complete the task 
- Completed (value in hour) – Actual time spent 

### User Story 
- DEV: <Identified tasks to complete the user story> - Assign to self 
- DEV: Handoff 
- DEV: PR Review 
- DEV: Test in QA environment 

### Bug
- DEV: <Identified tasks to resolve the bug> - Assign to self 
- DEV: Investigation and Fixing 

### Definition Of Done 
User story is complete if: 

- All acceptance criteria were met 
- For endpoint story, documentation file must be updated 
- Tested in QA environment 
- Handed Off
- QA complete with no P1 or P2 bugs found. 

## User Story and Bug Status in ADO 

User Story and Tasks 

    1. Status is NEW and assign to Dev 
    2. Dev to update status to ACTIVE when he/she started the work 
        a. Dev to update the Task as well 
    3. Dev to update the completed time in Task daily 
        a. Close the Task once done. 
    4. Dev to close all Tasks once development is done 
        a. Status remains to ACTIVE 
    5. QA to update the status to In QA, QA Complete then Resolved 

Bug and Tasks 

    1. Status is NEW and assign to Dev 
    2. Dev to update status to ACTIVE when he/she started the work 
        a. Dev to update the Task as well 
    3. Dev to update the completed time in Task daily 
        a. Close the Task once done. 
    4. Dev to close all Tasks once bug is fixed 
    5. If the fix has been verified in QA environment, Dev to assign the bug to Mark Louie Luna. marklouieluna@gocfs.pro. Assigning the bug to Louie is like telling the QA that is it ready for retest. 
        a. Status remains to ACTIVE 

## Branch Naming Convention and Pull Request Procedures 
#### Branch Name 
#### Format: users/<firstname initial+lastname>/<ItemType><ItemID>-Short Description 
- US Branch Example: `users/dbacay/US-1000-merchandise-page`
- Bug Branch Example: `users/dbacay/Bug-1223-merchandise-responsive-page`

### Pull Request Process 

    1. Dev to create a Pull Request in ADO once he/she is complete  and committed his/her changes. 
        a. PR Title Format: US or Bug <ID> : Title of User story or Bug 
        Ex: US 53256: Technical debt – Improve Unit Test Coverage 
        b. Mark Dave Bacay as required reviewer
        c. Link the Work Items – Input the user story or bug id 
        d. Then create/submit 
    2. Handoff the user story or bug to Dave or other leads before completing the PR. This is important to avoid bug and error.
    3. PR can be set to Auto-Complete or manually complete the PR once approved and already handded off
        a. Resolve comments 