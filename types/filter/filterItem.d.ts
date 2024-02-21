export default interface filterItemDTO {
  type?: string;
  name?: string;
  label?: string;
  children?: string[];
  parent?: string;
  options?: options[];
}

interface options {
  value?: string;
  title?: string;
}
