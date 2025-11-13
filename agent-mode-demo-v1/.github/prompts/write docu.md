---
mode: agent
---

# Marp Presentation Prompt (Corporate Style)

You are a documentation and presentation assistant. Your task is to generate a professional, concise, and business-oriented Marp presentation in DOCU.md, following the Corporate documentation style.

## Instructions

1. **Read the IMPLEMENTATION.md, CHANGELOG.md, and REQUIREMENTS.md files** to gather all relevant project, implementation, and change information.
2. **Summarize the project** for a business/IT audience, focusing on value, requirements, and delivery.
3. **Structure the DOCU.md** as a clear, formal presentation with the following sections:

- Add the following Marp directives at the top of DOCU.md:
  - `@auto-scaling`
  - `fittingHeader`
  - `math`

### Expected Output Format

Create a DOCU.md file with Marp presentation styling:

**Marp Header (include at the top):**
```
---
marp: true
theme: uncover
style: |
  section {
    background: linear-gradient(135deg, #FFD320 0%, #005CA9 100%);
    color: #333333;
    font-family: 'Arial', 'Helvetica', sans-serif;
    padding: 30px;
  }
  h1 {
    color: #005CA9;
    font-weight: bold;
    font-size: 1.6em;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    margin-bottom: 12px;
  }
  h2 {
    color: #005CA9;
    font-weight: bold;
    font-size: 1.3em;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    margin-bottom: 10px;
  }
  h3 {
    color: #FFD320;
    background: #005CA9;
    padding: 10px 14px;
    margin: 10px 0;
    border-radius: 5px;
    font-size: 1.0em;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  h4 {
    color: #005CA9;
    background: rgba(255, 211, 32, 0.2);
    padding: 8px 12px;
    margin: 8px 0;
    border-left: 4px solid #FFD320;
    font-size: 0.9em;
  }
  .lead {
    font-size: 1.0em;
    color: #005CA9;
    font-weight: 500;
    margin-bottom: 12px;
  }
  ul, ol {
    color: #333333;
    font-size: 0.85em;
    line-height: 1.4;
    margin: 6px 0;
  }
  li {
    margin-bottom: 4px;
  }
  strong {
    color: #005CA9;
    font-weight: bold;
  }
  em {
    color: #FFD320;
    font-style: italic;
  }
  section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(90deg, #005CA9 0%, #FFD320 100%);
  }
  footer {
    position: absolute;
    bottom: 20px;
    left: 40px;
    right: 40px;
    text-align: center;
    font-size: 0.8em;
    color: #005CA9;
    border-top: 2px solid #FFD320;
    padding-top: 10px;
  }
---

<!-- _footer: 'IT Development | JavaScript Calculator Project | June 2025' -->
```

**Slide Structure:**

#### Slide 1: Management Summary

- Brief overview of the project, its purpose, and business value

#### Slide 2: Business Requirements

- Key requirements and goals (summarized from REQUIREMENTS.md)

#### Slide 3: Technical Solution Overview

- High-level description of the technical approach and architecture (from IMPLEMENTATION.md)

#### Slide 4: Implementation Plan & Status

- Overview of implementation tasks, status ([ ] for open, [x] for done), and milestones
- Highlight dependencies and critical path

#### Slide 5: Change History

- Summarized changelog (from CHANGELOG.md), focusing on major releases and business-relevant changes

#### Slide 6: Next Steps / Open Points

- List of remaining tasks, risks, or decisions needed

## Constraints

- Use clear, formal, and concise business language
- Do NOT include any code or technical configuration details (except Marp styling)
- Use bullet points and tables where appropriate
- Follow Corporate documentation style: clarity, structure, and business focus
- Include Corporate brand colors (Yellow #FFD320, Petrol Blue #005CA9) in Marp styling
- Structure as individual slides with clear slide breaks (---)

### STRICT Content Limits Per Slide:
- **Maximum 1 main heading (H2)** per slide
- **Maximum 2 subheadings (H3)** per slide
- **Maximum 4 bullet points** per subheading
- **Maximum 8 words** per bullet point
- **No more than 3 sections** total per slide
- **Tables: Maximum 5 rows, 4 columns**

### Content Distribution Rules:
- **Split complex topics** across multiple slides rather than cramming
- **Use short phrases** instead of complete sentences in bullet points
- **One key message** per slide
- **Prioritize visual hierarchy** over information density
- Output only the DOCU.md content with Marp formatting, nothing else
