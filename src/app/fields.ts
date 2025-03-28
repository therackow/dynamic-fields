import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export const dynamicFields = {
  fields: [
    {
      label: 'First Name',
      formControlName: 'firstName',
      type: 'text',
      placeholder: 'Enter your first name',
      required: true,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },
      errorMessages: {
        required: 'First name is required',
        minlength: 'First name must be at least 2 characters long',
        maxlength: 'First name cannot exceed 20 characters',
      },
    },
    {
      label: 'Last Name',
      formControlName: 'lastName',
      type: 'text',
      placeholder: 'Enter your last name',
      required: true,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },
      errorMessages: {
        required: 'Last name is required',
        minlength: 'Last name must be at least 2 characters long',
        maxlength: 'Last name cannot exceed 20 characters',
      },
    },
    {
      label: 'Email',
      formControlName: 'email',
      type: 'text',
      placeholder: 'Enter your email address',
      required: true,
      validation: {
        required: true,
        email: true,
      },
      errorMessages: {
        required: 'Email is required',
        email: 'Please enter a valid email address',
      },
    },
    {
      label: 'State',
      formControlName: 'state',
      type: 'select',
      placeholder: 'Select your state',
      required: true,
      options: [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' },
      ],
      errorMessages: {
        required: 'State is required',
      },
      validation: {
        required: true,
      },
    },
    {
      label: 'Phone Number',
      formControlName: 'phoneNumber',
      type: 'text',
      placeholder: 'Enter your phone number',
      required: true,
      validation: {
        required: true,
        pattern: '^\\d{3}-\\d{3}-\\d{4}$',
      },
      errorMessages: {
        required: 'Phone number is required',
        pattern: 'Phone number must be in the format XXX-XXX-XXXX',
      },
    },
    {
      label: 'Is Active',
      formControlName: 'isActive',
      type: 'checkbox',
      required: false,
      default: false,
      validation: {},
      errorMessages: {},
    },
    {
      label: 'Active as of',
      formControlName: 'activeAsOf',
      type: 'date',
      placeholder: 'Select the date you became active',
      required: true,
      validation: {
        required: true,
        minDate: { year: 1900, month: 1, day: 1 },
        maxDate: today(),
      },
      errorMessages: {
        required: 'Active date is required',
        minDate: 'Active date must be after 1900-01-01',
        maxDate: 'Active date cannot be in the future',
      },
      props: [
        {
          name: 'disabled',
          condition: {
            field: 'isActive',
            value: false,
          },
        },
      ],
    },
    {
      label: 'Date of Birth',
      formControlName: 'dob',
      type: 'date',
      placeholder: 'Select your date of birth',
      required: true,
      validation: {
        required: true,
        minDate: { year: 1900, month: 1, day: 1 },
        maxDate: today(),
      },
      errorMessages: {
        required: 'Date of birth is required',
        minDate: 'Date of birth must be after 1900-01-01',
        maxDate: 'Date of birth cannot be in the future',
      },
    },
    {
      label: 'Gender',
      formControlName: 'gender',
      type: 'radio',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'non-binary', label: 'Non-binary' },
        { value: 'prefer-not-to-say', label: 'Prefer not to say' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      label: 'Explain',
      formControlName: 'preferNotToSayReason',
      type: 'text',
      placeholder: 'Why do you prefer not to say?',
      required: true,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },
      errorMessages: {
        required: 'Explain is required if you selected "Other"',
        minlength: 'Explain must be at least 2 characters long',
        maxlength: 'Explain cannot exceed 20 characters',
      },
      props: [
        {
          name: 'hidden',
          condition: {
            field: 'gender',
            value: 'prefer-not-to-say',
          },
        },
      ],
    },
    {
      label: 'Other Gender',
      formControlName: 'otherGender',
      type: 'text',
      placeholder: 'What is your gender?',
      required: true,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },
      errorMessages: {
        required: 'Other gender is required if you selected "Other"',
        minlength: 'Other gender must be at least 2 characters long',
        maxlength: 'Other gender cannot exceed 20 characters',
      },
      props: [
        {
          name: 'hidden',
          condition: {
            field: 'gender',
            value: 'other',
          },
        },
      ],
    },
    {
      label: 'Notes',
      formControlName: 'notes',
      type: 'textarea',
      placeholder: 'Enter any additional notes',
      required: false,
      validation: {
        maxLength: 200,
      },
      errorMessages: {
        maxlength: 'Notes cannot exceed 200 characters',
      },
    },
  ],
};

function today(): NgbDateStruct {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
}
