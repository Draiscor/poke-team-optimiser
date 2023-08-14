/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tquery GameVersions {\n\t\tpokemon_v2_version(order_by: { pokemon_v2_versiongroup: { order: asc } }) {\n\t\t\tid\n\t\t\tname\n\t\t\tpokemon_v2_versiongroup {\n\t\t\t\tgeneration_id\n\t\t\t\torder\n\t\t\t}\n\t\t}\n\t}\n": types.GameVersionsDocument,
    "\n\tquery PokemonInGeneration($generation: Int!, $version: String!) {\n\t\tpokemon_v2_pokemon(\n\t\t\twhere: {\n\t\t\t\tpokemon_v2_pokemonspecy: { generation_id: { _lte: $generation } }\n\t\t\t\tpokemon_v2_pokemonforms: {\n\t\t\t\t\tpokemon_v2_pokemonformgenerations: {\n\t\t\t\t\t\tgeneration_id: { _lte: $generation }\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\torder_by: { pokemon_species_id: asc }\n\t\t\tdistinct_on: pokemon_species_id\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\tpokemon_v2_encounters(\n\t\t\t\twhere: { pokemon_v2_version: { name: { _eq: $version } } }\n\t\t\t) {\n\t\t\t\tpokemon_v2_locationarea {\n\t\t\t\t\tpokemon_v2_location {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tpokemon_v2_region {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tpokemon_v2_version {\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t\tpokemon_v2_pokemonspecy {\n\t\t\t\tgeneration_id\n\t\t\t\thas_gender_differences\n\t\t\t\tevolves_from_species_id\n\t\t\t\tis_legendary\n\t\t\t\tis_mythical\n\t\t\t}\n\t\t\tpokemon_v2_pokemonsprites {\n\t\t\t\tsprites\n\t\t\t}\n\t\t\tpokemon_v2_pokemontypes(\n\t\t\t\twhere: { pokemon_v2_type: { generation_id: { _lte: $generation } } }\n\t\t\t\torder_by: { slot: asc }\n\t\t\t) {\n\t\t\t\tslot\n\t\t\t\tpokemon_v2_type {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tpokemon_v2_typeefficacies(\n\t\t\t\t\t\twhere: {\n\t\t\t\t\t\t\tdamage_factor: { _gt: 100 }\n\t\t\t\t\t\t\tpokemonV2TypeByTargetTypeId: {\n\t\t\t\t\t\t\t\tgeneration_id: { _lte: $generation }\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\torder_by: {\n\t\t\t\t\t\t\tdamage_factor: desc\n\t\t\t\t\t\t\tpokemonV2TypeByTargetTypeId: { name: asc }\n\t\t\t\t\t\t}\n\t\t\t\t\t) {\n\t\t\t\t\t\tdamage_factor\n\t\t\t\t\t\tpokemonV2TypeByTargetTypeId {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tgeneration_id\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.PokemonInGenerationDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GameVersions {\n\t\tpokemon_v2_version(order_by: { pokemon_v2_versiongroup: { order: asc } }) {\n\t\t\tid\n\t\t\tname\n\t\t\tpokemon_v2_versiongroup {\n\t\t\t\tgeneration_id\n\t\t\t\torder\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GameVersions {\n\t\tpokemon_v2_version(order_by: { pokemon_v2_versiongroup: { order: asc } }) {\n\t\t\tid\n\t\t\tname\n\t\t\tpokemon_v2_versiongroup {\n\t\t\t\tgeneration_id\n\t\t\t\torder\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery PokemonInGeneration($generation: Int!, $version: String!) {\n\t\tpokemon_v2_pokemon(\n\t\t\twhere: {\n\t\t\t\tpokemon_v2_pokemonspecy: { generation_id: { _lte: $generation } }\n\t\t\t\tpokemon_v2_pokemonforms: {\n\t\t\t\t\tpokemon_v2_pokemonformgenerations: {\n\t\t\t\t\t\tgeneration_id: { _lte: $generation }\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\torder_by: { pokemon_species_id: asc }\n\t\t\tdistinct_on: pokemon_species_id\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\tpokemon_v2_encounters(\n\t\t\t\twhere: { pokemon_v2_version: { name: { _eq: $version } } }\n\t\t\t) {\n\t\t\t\tpokemon_v2_locationarea {\n\t\t\t\t\tpokemon_v2_location {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tpokemon_v2_region {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tpokemon_v2_version {\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t\tpokemon_v2_pokemonspecy {\n\t\t\t\tgeneration_id\n\t\t\t\thas_gender_differences\n\t\t\t\tevolves_from_species_id\n\t\t\t\tis_legendary\n\t\t\t\tis_mythical\n\t\t\t}\n\t\t\tpokemon_v2_pokemonsprites {\n\t\t\t\tsprites\n\t\t\t}\n\t\t\tpokemon_v2_pokemontypes(\n\t\t\t\twhere: { pokemon_v2_type: { generation_id: { _lte: $generation } } }\n\t\t\t\torder_by: { slot: asc }\n\t\t\t) {\n\t\t\t\tslot\n\t\t\t\tpokemon_v2_type {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tpokemon_v2_typeefficacies(\n\t\t\t\t\t\twhere: {\n\t\t\t\t\t\t\tdamage_factor: { _gt: 100 }\n\t\t\t\t\t\t\tpokemonV2TypeByTargetTypeId: {\n\t\t\t\t\t\t\t\tgeneration_id: { _lte: $generation }\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\torder_by: {\n\t\t\t\t\t\t\tdamage_factor: desc\n\t\t\t\t\t\t\tpokemonV2TypeByTargetTypeId: { name: asc }\n\t\t\t\t\t\t}\n\t\t\t\t\t) {\n\t\t\t\t\t\tdamage_factor\n\t\t\t\t\t\tpokemonV2TypeByTargetTypeId {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tgeneration_id\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery PokemonInGeneration($generation: Int!, $version: String!) {\n\t\tpokemon_v2_pokemon(\n\t\t\twhere: {\n\t\t\t\tpokemon_v2_pokemonspecy: { generation_id: { _lte: $generation } }\n\t\t\t\tpokemon_v2_pokemonforms: {\n\t\t\t\t\tpokemon_v2_pokemonformgenerations: {\n\t\t\t\t\t\tgeneration_id: { _lte: $generation }\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\torder_by: { pokemon_species_id: asc }\n\t\t\tdistinct_on: pokemon_species_id\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\tpokemon_v2_encounters(\n\t\t\t\twhere: { pokemon_v2_version: { name: { _eq: $version } } }\n\t\t\t) {\n\t\t\t\tpokemon_v2_locationarea {\n\t\t\t\t\tpokemon_v2_location {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tpokemon_v2_region {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tpokemon_v2_version {\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t\tpokemon_v2_pokemonspecy {\n\t\t\t\tgeneration_id\n\t\t\t\thas_gender_differences\n\t\t\t\tevolves_from_species_id\n\t\t\t\tis_legendary\n\t\t\t\tis_mythical\n\t\t\t}\n\t\t\tpokemon_v2_pokemonsprites {\n\t\t\t\tsprites\n\t\t\t}\n\t\t\tpokemon_v2_pokemontypes(\n\t\t\t\twhere: { pokemon_v2_type: { generation_id: { _lte: $generation } } }\n\t\t\t\torder_by: { slot: asc }\n\t\t\t) {\n\t\t\t\tslot\n\t\t\t\tpokemon_v2_type {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tpokemon_v2_typeefficacies(\n\t\t\t\t\t\twhere: {\n\t\t\t\t\t\t\tdamage_factor: { _gt: 100 }\n\t\t\t\t\t\t\tpokemonV2TypeByTargetTypeId: {\n\t\t\t\t\t\t\t\tgeneration_id: { _lte: $generation }\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\torder_by: {\n\t\t\t\t\t\t\tdamage_factor: desc\n\t\t\t\t\t\t\tpokemonV2TypeByTargetTypeId: { name: asc }\n\t\t\t\t\t\t}\n\t\t\t\t\t) {\n\t\t\t\t\t\tdamage_factor\n\t\t\t\t\t\tpokemonV2TypeByTargetTypeId {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tgeneration_id\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;