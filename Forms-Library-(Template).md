# Overview
The forms library is a set forms where the user can able to create or generate a form in the project by clicking a button.

GET
- **onChange**: should be 3 characters to be able to filter the forms

- **props condition**
   - disabled: if project is finalized
   - if the form has been added in the project management view, the add button will filled else it's outlined
   -

- Endpoint: {form-domain}/projectforms/{projectId}
- Method: POST
- Payload

```
{
    "ProjectId": string,
    "FormId": number,
    "ProjectFormName": string,
    "ProjectDiagnosticId": number,
    "ModifiedDate": Date,
    "ModifiedUser": string,
    "Units": number[]
}
```


- Response: 

```
{
    "ProjectId": string,
    "FormId": number,
    "ProjectFormName": string,
    "ProjectDiagnosticId": number,
    "ModifiedUser": string,
    "ModifiedDate": string,
    "ProjectFormId": number,
    "ProjectFormSchemaId": string,
    "MethodologyVersionId": number
}
```
