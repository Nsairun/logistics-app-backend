const createButton = (text, href) => {
  return `
        <a
            href="${href}"
            style="cursor: pointer; color: black; padding: 10px 15px; margin: 4rem auto; background-color: gray; border: none"
        >
            ${text}
        </a>
    `;
};

module.exports = {
  createButton,
};
