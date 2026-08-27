export const LEVELS = ["A", "AA", "AAA"];

export const LEVEL_META = {
  A: {
    label: "Level A",
    subtitle: "Minimum",
    status: "Minimum conformance",
    description:
      "Baseline accessibility: semantic HTML, labels, keyboard access, and basic errors.",
  },
  AA: {
    label: "Level AA",
    subtitle: "Recommended",
    status: "Recommended conformance",
    description:
      "Stronger focus rings, better contrast, clearer instructions, and linked error messages.",
  },
  AAA: {
    label: "Level AAA",
    subtitle: "Enhanced",
    status: "Enhanced accessibility",
    description:
      "Extra help text, detailed errors, and a review step before submit.",
  },
};

export const LEVEL_FEATURES = {
  A: [
    "Semantic HTML",
    "Form labels",
    "Keyboard accessible",
    "Basic error messages",
  ],
  AA: [
    "Everything in Level A",
    "Visible focus indicators",
    "Improved contrast",
    "Instructions linked to fields",
    "Clearer error recovery",
  ],
  AAA: [
    "Everything in Level A and AA",
    "Expanded field guidance",
    "Detailed error help",
    "Review before submit",
  ],
};

export const WHAT_CHANGED = {
  AA: [
    "Visible focus on every control",
    "Stronger contrast on text and borders",
    "Hints linked with aria-describedby",
    "Errors tied to each field",
  ],
  AAA: [
    "Plain-language help on each field",
    "Privacy note on email",
    "Review step before sending",
    "Richer error messages",
  ],
};
