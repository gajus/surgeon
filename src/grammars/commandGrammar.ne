@{%
  const appendItem = (a, b) => d => d[a].concat([d[b]]);
%}

subroutines ->
    subroutines _ "|" _ subroutine {% appendItem(0, 4) %}
  | subroutine

subroutine ->
    subroutineName " " parameters {% d => ({subroutine: d[0], parameters: d[2]}) %}
  | subroutineName {% d => ({subroutine: d[0], parameters: []}) %}

subroutineName ->
  [a-zA-Z0-9\-_]:+ {% d => d[0].join('') %}

parameters ->
    parameters " " parameter {% appendItem(0, 2) %}
  | parameter

parameter ->
    [^|"' ]:+ {% d => d[0].join('') %}
  | sqstring {% id %}
  | dqstring {% id %}

dqstring ->
  "\"" dstrchar:* "\"" {% d => d[1].join('') %}

dstrchar ->
    [^"] {% id %}
  | "\\\"" {% d => '"' %}

sqstring ->
  "'" sstrchar:* "'" {% d => d[1].join('') %}

sstrchar ->
    [^'] {% id %}
  | "\\'" {% d => '\'' %}

_ ->
  [ ]:* {% d => null %}
