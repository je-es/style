# [@je-es](https://github.com/je-es)/style

> A utility for styling text output, providing customizable formatting options such as foreground and background colors, text attributes, padding, borders, width, and alignment.

- #### 📥 Usage

    ```Bash
    npm i @je-es/style
    ```

- #### 🌟 Syntax

    ```ts
    import { style } from '@je-es/style';

    style('Hello World',
    {
        fg      ?: t_color,     // string('name' | '#hex') | array[r,g,b]
        bg      ?: t_color,     // ...
        attr    ?: t_attr,      // string | string [],

        prefix  ?: t_prefix,    // { val : string, fg ?: t_color, bg ?: t_color }
        suffix  ?: t_prefix,    // ...

        padding ?: t_padding,   // { top, bottom, right, left }
        border  ?: t_border,    // { width ?: number, fg ?: t_color, bg ?: t_color }

        align   ?: t_align      // 'center' | 'right' | 'left'

        width   ?: number,
    })
    ```

---

### Documentation

  - [API](./src/docs/src/api.md)

---

> **Made with ❤ by [Maysara Elshewehy](https://github.com/Maysara-Elshewehy)**