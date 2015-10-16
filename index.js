const huggare = require('huggare'),
      changeCase = require('change-case'),
      extend = require('extend');

function Auditor(tag, user, items, logger) {
  logger = logger || new huggare.Logger(); // eslint-disable-line no-param-reassign

  items.forEach(it => {
    const item = (typeof it === 'string')
      ? { name: it }
      : it;

    const name = item.name;
    const severity = item.severity || huggare.Severities.INFO;
    const message = `(${user.username}) ${item.message || changeCase.sentenceCase(name)}`;
    const action = changeCase.constantCase(name);

    this[name] = (o) => {
      const x = {};

      if (o) {
        o.stack
          ? x.err = o
          : extend(x, o);
      }

      extend(x, { message, action, user });

      logger.println(severity, tag, x);
    };
  });
}

module.exports = Auditor;
