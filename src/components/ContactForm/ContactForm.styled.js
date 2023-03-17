import styled from 'styled-components';
import { ErrorMessage as FormikError } from 'formik';

export const SubmitBtn = styled.button`
  display: block;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 30px;
`;

export const LabelSpan = styled.span`
  display: block;
  font-size: 22px;
`;

export const Form = styled.form`
  width: 300px;
  border: 1px solid black;
  padding: 10px;
`;

export const ErrorMessage = styled(FormikError)`
  color: tomato;
`;
