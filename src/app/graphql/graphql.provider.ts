import { inject, Provider } from '@angular/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export function provideGraphQL(): Provider[] {
  return [
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      const auth = setContext(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          return {};
        }
        return {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        };
      });

      return {
        link: ApolloLink.from([auth, httpLink.create({ uri: environment.graphqlUrl })]),
        cache: new InMemoryCache(),
        defaultOptions: {
          watchQuery: { fetchPolicy: 'network-only' },
          query: { fetchPolicy: 'network-only' },
        },
      };
    }),
  ];
}
