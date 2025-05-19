import { render, screen, fireEvent } from '@testing-library/react';
import ProfileForm from '@/app/ui/Profile/components/ProfileForm';
import ProfileField from '@/app/ui/Profile/components/ProfileField';
import PeriodAndStage from '@/components/auth-form/PeriodAndStage';

// MOCK DATA
const mockFields = {
  personal_data: [
    { title: 'Name', name: 'full_name', type: 'text' },
    { title: 'Age', name: 'age', type: 'number' },
    { title: 'Email', name: 'email', type: 'disabled' },
    { title: 'Phone', name: 'phone_number', type: 'disabled' },
  ],
  pregnancy_state: [
    {
      title: 'Baby Gender',
      name: 'baby_sex',
      type: 'select',
      options: [
        { value: 'boy', label: 'Boy' },
        { value: 'girl', label: 'Girl' },
      ],
    },
    { title: 'First Child', name: 'first_child', type: 'switch' },
    { title: 'Pregnancy Loss', name: 'pregnancy_loss', type: 'switch' },
  ],
  medical_details: [
    {
      title: 'Blood Pressure',
      name: 'pregnancy_blood_pressure',
      type: 'switch',
    },
    { title: 'Diabetes', name: 'gestational_diabetes', type: 'switch' },
  ],
};

const mockMotherData = {
  user: {
    full_name: 'Sara',
    age: 30,
    email: 'sara@example.com',
    phone_number: '09121234567',
    profile_image: '/img.png',
  },
  last_period: '2024-01-01',
  pregnancy_days: 60,
};

// TESTS
describe('ProfileForm & related components', () => {
  test('renders profile image component', () => {
    render(
      <ProfileForm
        profileFields={mockFields}
        motherData={mockMotherData}
        weeks={[]}
      />,
    );
    const img = screen.getByAltText(/choose image/i);
    expect(img).toBeInTheDocument();
  });

  test('renders name input field', () => {
    render(
      <ProfileField
        title="Name"
        name="full_name"
        type="text"
        defaultValue="Test"
        onFieldChange={() => {}}
        removeError={() => {}}
      />,
    );
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  });

  test('shows error message for field', () => {
    render(
      <ProfileField
        title="Age"
        name="age"
        type="number"
        defaultValue=""
        error="Invalid age"
        onFieldChange={() => {}}
        removeError={() => {}}
      />,
    );
    expect(screen.getByText(/Invalid age/i)).toBeVisible();
  });

  test('renders select field for baby gender', () => {
    render(
      <ProfileField
        title="Baby Gender"
        name="baby_sex"
        type="select"
        options={[
          { value: 'boy', label: 'Boy' },
          { value: 'girl', label: 'Girl' },
        ]}
        defaultValue=""
        onFieldChange={() => {}}
        removeError={() => {}}
      />,
    );
    expect(screen.getByText(/Select/i)).toBeInTheDocument();
  });

  test('renders period and stage section with datepicker', () => {
    render(
      <PeriodAndStage
        onInputChange={() => {}}
        weeks={[]}
        defaultValue={{ period: '2024-01-01', stage: 50 }}
      />,
    );
    expect(screen.getByLabelText(/last period/i)).toBeInTheDocument();
  });

  test('renders switch field', () => {
    render(
      <ProfileField
        title="First Child"
        name="first_child"
        type="switch"
        defaultValue={true}
        onFieldChange={() => {}}
      />,
    );
    expect(screen.getByLabelText(/First Child/i)).toBeInTheDocument();
  });

  test('renders disabled input', () => {
    render(
      <ProfileField
        title="Email"
        name="email"
        type="disabled"
        defaultValue="user@example.com"
        onFieldChange={() => {}}
      />,
    );
    const input = screen.getByDisplayValue(/user@example.com/i);
    expect(input).toBeDisabled();
  });

  test('renders all section titles', () => {
    render(
      <ProfileForm
        profileFields={mockFields}
        motherData={mockMotherData}
        weeks={[]}
      />,
    );
    expect(screen.getByText(/personal data/i)).toBeInTheDocument();
    expect(screen.getByText(/pregnancy state/i)).toBeInTheDocument();
    expect(screen.getByText(/medical details/i)).toBeInTheDocument();
  });

  test('calls removeError on change', () => {
    const removeError = jest.fn();
    render(
      <ProfileField
        title="Age"
        name="age"
        type="text"
        defaultValue=""
        onFieldChange={() => {}}
        removeError={removeError}
      />,
    );
    const input = screen.getByLabelText(/Age/i);
    fireEvent.change(input, { target: { value: '30' } });
    expect(removeError).toHaveBeenCalledWith('age');
  });

  test('calls onInputChange when date changes', () => {
    const onInputChange = jest.fn();
    render(
      <PeriodAndStage
        onInputChange={onInputChange}
        weeks={[]}
        defaultValue={{ period: '2024-01-01', stage: 60 }}
      />,
    );
    const input = screen.getByPlaceholderText(/days placeholder/i);
    fireEvent.blur(input, { target: { value: '55' } });
    expect(onInputChange).toHaveBeenCalled();
  });
});
