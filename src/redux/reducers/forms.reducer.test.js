import { providerAnswers, clientAnswers } from './forms.reducer';

describe('testing clientAnswers reducer', () => {
  test('SET_CLIENT_PERSONAL_DETAILS', () => {
    const initialState = {
      first_name: '',
      last_name: '',
      pic: '',
      date_of_birth: '',
      write_in_pronouns: '',
      location: '',
      primary_reason: '',
      previous_therapy: false,
      previous_experience: '',
      insurance: false,
      sliding_scale: false,
      preferences: [],
    };
    const action = {
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: {
        key: 'first_name',
        value: 'Travis',
      },
    };

    expect(clientAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      date_of_birth: '',
      write_in_pronouns: '',
      location: '',
      primary_reason: '',
      previous_therapy: false,
      previous_experience: '',
      insurance: false,
      sliding_scale: false,
      preferences: [],
    });
  });

  test('SET_CLIENT_PERSONAL_DETAILS', () => {
    const initialState = {
      first_name: 'Travis',
      last_name: '',
      pic: '',
      date_of_birth: '',
      write_in_pronouns: '',
      location: '',
      primary_reason: '',
      previous_therapy: false,
      previous_experience: '',
      insurance: false,
      sliding_scale: false,
      preferences: [],
    };
    const action = {
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: {
        key: 'location',
        value: 'Minneapolis',
      },
    };

    expect(clientAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      date_of_birth: '',
      write_in_pronouns: '',
      location: 'Minneapolis',
      primary_reason: '',
      previous_therapy: false,
      previous_experience: '',
      insurance: false,
      sliding_scale: false,
      preferences: [],
    });
  });

  test('SET_CLIENT_PERSONAL_DETAILS', () => {
    const initialState = {
      first_name: 'Travis',
      last_name: '',
      pic: '',
      date_of_birth: '',
      write_in_pronouns: '',
      location: 'Minneapolis',
      primary_reason: '',
      previous_therapy: false,
      previous_experience: '',
      insurance: false,
      sliding_scale: false,
      preferences: [],
    };
    const action = {
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: {
        key: 'previous_therapy',
        value: true,
      },
    };

    expect(clientAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      date_of_birth: '',
      write_in_pronouns: '',
      location: 'Minneapolis',
      primary_reason: '',
      previous_therapy: true,
      previous_experience: '',
      insurance: false,
      sliding_scale: false,
      preferences: [],
    });
  });

  test('SET_CLIENT_PREFERENCES', () => {
    const initialState = {
      first_name: 'Travis',
      last_name: '',
      pic: '',
      date_of_birth: '',
      write_in_pronouns: '',
      location: 'Minneapolis',
      primary_reason: '',
      previous_therapy: true,
      previous_experience: '',
      insurance: false,
      sliding_scale: false,
      preferences: [],
    };
    const action = {
      type: 'SET_CLIENT_PREFERENCES',
      payload: 16,
    };

    expect(clientAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      date_of_birth: '',
      write_in_pronouns: '',
      location: 'Minneapolis',
      primary_reason: '',
      previous_therapy: true,
      previous_experience: '',
      insurance: false,
      sliding_scale: false,
      preferences: [16],
    });
  });

  test('SET_CLIENT_PREFERENCES', () => {
    const initialState = {
      first_name: 'Travis',
      last_name: '',
      pic: '',
      date_of_birth: '',
      write_in_pronouns: '',
      location: 'Minneapolis',
      primary_reason: '',
      previous_therapy: true,
      previous_experience: '',
      insurance: false,
      sliding_scale: false,
      preferences: [16],
    };
    const action = {
      type: 'SET_CLIENT_PREFERENCES',
      payload: 24,
    };

    expect(clientAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      date_of_birth: '',
      write_in_pronouns: '',
      location: 'Minneapolis',
      primary_reason: '',
      previous_therapy: true,
      previous_experience: '',
      insurance: false,
      sliding_scale: false,
      preferences: [16, 24],
    });
  });

  test('SET_INSURANCE_SLIDING_SCALE', () => {
    const initialState = {
      first_name: 'Travis',
      last_name: '',
      pic: '',
      date_of_birth: '',
      write_in_pronouns: '',
      location: 'Minneapolis',
      primary_reason: '',
      previous_therapy: true,
      previous_experience: '',
      insurance: false,
      sliding_scale: false,
      preferences: [16, 24],
    };
    const action = {
      type: 'SET_INSURANCE_SLIDING_SCALE',
      payload: 'insurance',
    };

    expect(clientAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      date_of_birth: '',
      write_in_pronouns: '',
      location: 'Minneapolis',
      primary_reason: '',
      previous_therapy: true,
      previous_experience: '',
      insurance: true,
      sliding_scale: false,
      preferences: [16, 24],
    });
  });

  test('SET_PROVIDER_PERSONAL_DETAILS', () => {
    const initialState = {
      first_name: '',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: false,
      sliding_scale: false,
      preferences: [],
      questions: [],
    };
    const action = {
      type: 'SET_PROVIDER_PERSONAL_DETAILS',
      payload: {
        key: 'first_name',
        value: 'Travis',
      },
    };

    expect(providerAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: false,
      sliding_scale: false,
      preferences: [],
      questions: [],
    });
  });

  test('SET_PROVIDER_PERSONAL_DETAILS', () => {
    const initialState = {
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: false,
      sliding_scale: false,
      preferences: [],
      questions: [],
    };
    const action = {
      type: 'SET_PROVIDER_PERSONAL_DETAILS',
      payload: {
        key: 'insurance',
        value: true,
      },
    };

    expect(providerAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [],
      questions: [],
    });
  });

  test('SET_PROVIDER_PREFERENCES', () => {
    const initialState = {
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [],
      questions: [],
    };
    const action = {
      type: 'SET_PROVIDER_PREFERENCES',
      payload: 69,
    };

    expect(providerAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [69],
      questions: [],
    });
  });

  test('SET_PROVIDER_PREFERENCES', () => {
    const initialState = {
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [69],
      questions: [],
    };
    const action = {
      type: 'SET_PROVIDER_PREFERENCES',
      payload: 109,
    };

    expect(providerAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [69, 109],
      questions: [],
    });
  });

  test('SET_PROVIDER_QUESTIONS', () => {
    const initialState = {
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [69, 109],
      questions: [],
    };
    const action = {
      type: 'SET_PROVIDER_QUESTIONS',
      payload: {
        question_id: 5,
        answer: 'This is my answer.',
      },
    };

    expect(providerAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [69, 109],
      questions: [
        {
          question_id: 5,
          answer: 'This is my answer.',
        },
      ],
    });
  });

  test('SET_PROVIDER_QUESTIONS', () => {
    const initialState = {
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [69, 109],
      questions: [
        {
          question_id: 5,
          answer: 'This is my answer.',
        },
      ],
    };
    const action = {
      type: 'SET_PROVIDER_QUESTIONS',
      payload: {
        question_id: 4,
        answer: 'This is my answer for 4.',
      },
    };

    expect(providerAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [69, 109],
      questions: [
        {
          question_id: 5,
          answer: 'This is my answer.',
        },
        {
          question_id: 4,
          answer: 'This is my answer for 4.',
        },
      ],
    });
  });

  test('SET_PROVIDER_QUESTIONS', () => {
    const initialState = {
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [69, 109],
      questions: [
        {
          question_id: 5,
          answer: 'This is my answer.',
        },
        {
          question_id: 4,
          answer: 'This is my answer for 4.',
        },
        {
          question_id: 6,
          answer: 'This is my answer for 6.',
        },
      ],
    };
    const action = {
      type: 'SET_PROVIDER_QUESTIONS',
      payload: {
        question_id: 4,
        answer: 'This is my answer for 4 again.',
      },
    };

    expect(providerAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [69, 109],
      questions: [
        {
          question_id: 5,
          answer: 'This is my answer.',
        },
        {
          question_id: 4,
          answer: 'This is my answer for 4 again.',
        },
        {
          question_id: 6,
          answer: 'This is my answer for 6.',
        },
      ],
    });
  });

  test('SET_PROVIDER_QUESTIONS', () => {
    const initialState = {
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [69, 109],
      questions: [
        {
          question_id: 5,
          answer: 'This is my answer.',
        },
        {
          question_id: 4,
          answer: 'This is my answer for 4 again.',
        },
        {
          question_id: 6,
          answer: 'This is my answer for 6.',
        },
      ],
    };
    const action = {
      type: 'SET_PROVIDER_QUESTIONS',
      payload: {
        question_id: 5,
        answer: 'This is my new answer for 5.',
      },
    };

    expect(providerAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [69, 109],
      questions: [
        {
          question_id: 5,
          answer: 'This is my new answer for 5.',
        },
        {
          question_id: 4,
          answer: 'This is my answer for 4 again.',
        },
        {
          question_id: 6,
          answer: 'This is my answer for 6.',
        },
      ],
    });
  });

  test('SET_PROVIDER_QUESTIONS', () => {
    const initialState = {
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [69, 109],
      questions: [
        {
          question_id: 5,
          answer: 'This is my new answer for 5.',
        },
        {
          question_id: 4,
          answer: 'This is my answer for 4 again.',
        },
        {
          question_id: 6,
          answer: 'This is my answer for 6.',
        },
      ],
    };
    const action = {
      type: 'SET_PROVIDER_QUESTIONS',
      payload: {
        question_id: 2,
        answer: 'This is my answer for 2.',
      },
    };

    expect(providerAnswers(initialState, action)).toEqual({
      first_name: 'Travis',
      last_name: '',
      pic: '',
      video: '',
      location: '',
      date_of_birth: '',
      write_in_pronouns: '',
      background: '',
      strengths: '',
      approach: '',
      insurance: true,
      sliding_scale: false,
      preferences: [69, 109],
      questions: [
        {
          question_id: 5,
          answer: 'This is my new answer for 5.',
        },
        {
          question_id: 4,
          answer: 'This is my answer for 4 again.',
        },
        {
          question_id: 6,
          answer: 'This is my answer for 6.',
        },
        {
          question_id: 2,
          answer: 'This is my answer for 2.',
        },
      ],
    });
  });
});
